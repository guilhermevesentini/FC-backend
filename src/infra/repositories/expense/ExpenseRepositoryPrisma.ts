import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import { ExpenseGateway } from "../../gateways/expenses/ExpenseGateway";
import { ExpenseDto, ExpenseInputDto, ExpenseMonthDto } from "../../../application/dtos/expensesDto";

export class ExpenseRepositoryPrisma implements ExpenseGateway {

  private constructor(private readonly prismaClient: PrismaClient) {}  

  public static build(prismaClient: PrismaClient){
    return new ExpenseRepositoryPrisma(prismaClient);
  }

  // Criar a despesa principal e os meses associados
  public async create(expense: ExpenseDto, monthsData: ExpenseMonthDto[]): Promise<ExpenseDto> {
    if (!expense.customerId) throw new Error('Erro ao autenticar usuário');
    
    const expenseData = {
      id: uuidv4(),
      nome: expense.nome,
      vencimento: expense.vencimento,
      tipoLancamento: expense.tipoLancamento,
      inicio: expense.range?.inicio,
      fim: expense.range?.fim,
      replicar: expense.replicar,
      customerId: expense.customerId,
    };

    if (!monthsData.length) throw new Error('Ocorreu um problema ao criar os meses');
    if (!expenseData.id) throw new Error('Não é possível criar os meses por conta de identificação.');

    const months = monthsData?.map((m) => ({
      id: uuidv4(),
      mes: m.mes,
      ano: m.ano,
      valor: parseFloat(Number(m.valor).toFixed(2)),
      contaId: m.contaId,
      status: Number(m.status),
      despesaId: expenseData.id,
      descricao: m.descricao,
      customerId: m.customerId,
      vencimento: m.vencimento,
      observacao: m.observacao,
      categoria: m.categoria
    }));

    const isInvalidMonth = months?.map((mes) => mes.mes >= 13 || mes.mes <= 0).some((item) => item == true);
    if (isInvalidMonth) throw new Error('Mês incorreto');

    try {
      await this.prismaClient.expenses.create({
        data: expenseData
      });

      if (months) {
        await this.prismaClient.expensesMonths.createMany({
          data: months
        });
      }
    } catch (err) {
      console.log('Erro ao criar despesa:', err);
      throw new Error('Erro ao criar despesa');
    }

    return {
      ...expenseData,
      meses: months?.map((m) => ({
        ...m,
        valor: m.valor.toString(),
        status: m.status.toString(),
      }))
    };
  }

  public async get(mes: number, ano: number, customerId: string): Promise<ExpenseDto[]> {
    if (!customerId) throw new Error('Erro ao autenticar usuário');
    
    const expenses = await this.prismaClient.expenses.findMany({
      where: {
        customerId,
      }
    });

    const months = await this.prismaClient.expensesMonths.findMany({
      where: {
        mes,
        ano,
        customerId,
      },
      select: {
        id: true,
        mes: true,
        ano: true,
        valor: true,
        status: true,
        descricao: true,
        despesaId: true,
        customerId: true,
        vencimento: true,
        observacao: true,
        categoria: true,
        contaId: true,
      },
    });

    const formattedExpenses: ExpenseDto[] = expenses.map((expense) => {
      const filteredMonths = months.filter((mes) => mes.despesaId === expense.id);

      const mappedMonths = filteredMonths.map((mes) => ({
        id: mes.id,
        mes: mes.mes,
        despesaId: mes.despesaId,
        ano: mes.ano,
        contaId: mes.contaId,
        valor: mes.valor.toString(),
        status: mes.status.toString(),
        descricao: mes.descricao,
        customerId: mes.customerId,
        vencimento: mes.vencimento,
        observacao: mes.observacao,
        categoria: mes.categoria,
      }));

      return {
        ...expense,
        meses: mappedMonths,
      };
    });
    
    return formattedExpenses;
  }

  // Editar uma despesa existente
  public async edit(expense: ExpenseInputDto): Promise<void> {
    if (!expense.customerId) throw new Error('Erro ao autenticar usuário');

    const existingExpense = await this.prismaClient.expenses.findUnique({
      where: {
        id: expense.despesaId
      },
    });

    if (!existingExpense) {
      throw new Error(`Despesa não encontrada para o mês ${expense.mes} e ano ${expense.ano}`);
    }

    await this.prismaClient.expenses.update({
      where: { id: existingExpense.id },
      data: {
        nome: expense.nome,
        vencimento: expense.vencimento,
        tipoLancamento: expense.tipoLancamento,
        inicio: expense.range?.inicio,
        fim: expense.range?.fim,
        replicar: expense.replicar,
      },
    });

    await this.editMonth(expense);
  }

  // Editar um mês específico
  public async editMonth(mes: ExpenseMonthDto): Promise<void> {
    if (!mes || mes.mes >= 13 || mes.mes <= 0) throw new Error('Mês incorreto');
    
    const existingExpenseMonth = await this.prismaClient.expensesMonths.findUnique({
      where: {
        id: mes.id,
        mes: Number(mes.mes),
      },
    });

    if (!existingExpenseMonth) {
      throw new Error(`Despesa não encontrada para o mês ${mes.mes} e ano ${mes.ano}`);
    }

    const valor = parseFloat(Number(mes.valor).toFixed(2));

    await this.prismaClient.expensesMonths.update({
      where: {
        id: existingExpenseMonth.id,
      },
      data: {
        valor: valor,
        descricao: mes.descricao,
        observacao: mes.observacao,
        vencimento: mes.vencimento,
        status: Number(mes.status),
        categoria: mes.categoria,
        ano: mes.ano,
        mes: mes.mes,
        contaId: mes.contaId
      },
    });
  }

  public async editAll(expense: ExpenseDto, customerId: string): Promise<void> {
    if (!customerId) throw new Error('Erro ao autenticar usuário');
    
    const { id, nome, vencimento, replicar, meses, tipoLancamento, range } = expense;

    // Atualizar a despesa principal
    await this.prismaClient.expenses.update({
      where: { id: id, customerId },
      data: {
        nome,
        tipoLancamento,
        vencimento,
        inicio: range?.inicio,
        fim: range?.fim,
        replicar,
      },
    });

    const isInvalidMonth = meses?.map((mes) => mes.mes >= 13 || mes.mes <= 0).some((item) => item == true);

    if (isInvalidMonth) throw new Error('Mes incorreto');

    if (meses && meses.length >= 1) {
      // Atualizar os meses associados à despesa
      for (const mes of meses) {
        await this.prismaClient.expensesMonths.updateMany({
          where: {
            despesaId: id,
            customerId,
            ano: mes.ano,
            mes: mes.mes,
          },
          data: {
            valor: parseFloat(Number(mes.valor).toFixed(2)),
            status: Number(mes.status),
            descricao: mes.descricao,
            categoria: mes.categoria,
            observacao: mes.observacao,
            vencimento: mes.vencimento,
          },
        });
      }
    }
  }


  // Deletar uma despesa ou um mês específico
  public async delete(customerId: string, id: string, mes?: number): Promise<void> {
    if (!customerId || !id) throw new Error('Houve um erro ao deletar');
    
    if (mes == 99) {
      await this.prismaClient.$transaction(async (prisma) => {
        await prisma.expensesMonths.deleteMany({
          where: {
            customerId: customerId,
            despesaId: id,
          },
        });
  
        await prisma.expenses.delete({
          where: {
            customerId,
            id,
          },
        });
      });      
    } else {
      await this.prismaClient.expensesMonths.deleteMany({
        where: {
          customerId: customerId,
          despesaId: id,
          mes: mes,
        },
      });

      const months = await this.prismaClient.expensesMonths.findMany({
        where: {
          despesaId: id,
        },
        select: {
          id: true,
          mes: true,
          ano: true,
          valor: true,
          status: true,
          descricao: true,
          despesaId: true,
          customerId: true,
          vencimento: true,
          observacao: true,
          categoria: true,
          contaId: true,
        },
      });

      if (months.length == 0) {
        await this.prismaClient.expenses.deleteMany({
          where: {
            customerId,
            id: id,
          },
        });
      }
    }
  }
}
