import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import { ExpenseGateway } from "../../gateways/expenses/ExpenseGateway";
import { ExpenseDto, ExpenseInputDto, ExpenseMonthDto } from "../../../application/dtos/expensesDto";

export class ExpenseRepositoryPrisma implements ExpenseGateway {

  private constructor(private readonly prismaClient: PrismaClient){}  
  
  public static build(prismaClient: PrismaClient){
    return new ExpenseRepositoryPrisma(prismaClient)
  }

  //modelar para o banco
  public async create(expense: ExpenseDto): Promise<ExpenseDto> {
    const expenseData = {
      id: uuidv4(),
      nome: expense.nome,
      vencimento: expense.vencimento,
      tipoLancamento: expense.tipoLancamento,
      inicio: expense.range?.inicio,
      fim: expense.range?.fim,
      replicar: expense.replicar,
      customerId: expense.customerId,
    }   
    
    const months = expense.meses?.map((m) => ({
      id: uuidv4(),
      mes: m.mes,
      ano: m.ano,
      valor: parseFloat(Number(m.valor).toFixed(2)),
      status: Number(m.status),
      despesaId: expenseData.id,
      descricao: m.descricao,
      customerId: m.customerId,
      vencimento: m.vencimento,
      observacao: m.observacao,
      categoria: m.categoria,
      contaId: m.contaId
    })); 

    await this.prismaClient.expenses.create({
      data: expenseData
    })

    if (months) {
      await this.prismaClient.expensesMonths.createMany({
        data: months
      })
    }

    return {
      ...expenseData,
      meses: months?.map((m) => {
        return {
          ...m,
          valor: m.valor.toString(),
          status: m.status.toString()
        }
      })
    }
  }

  public async get(mes: number, ano: number, customerId: string): Promise<ExpenseDto[]> {
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
        contaId: true
      },
    });

    const formattedExpenses: ExpenseDto[] = expenses.map((expense) => ({
    ...expense,
    meses: months
      .filter((mes) => expense.id === mes.despesaId) // Filter relevant months
      .map((mes) => ({
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
      })),
    }));


    return formattedExpenses;
  }

  
  public async edit(expense: ExpenseInputDto): Promise<void> {
    const existingExpense= await this.prismaClient.expenses.findUnique({
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

    await this.editMonth(expense)
  }

  public async editAll(expense: ExpenseDto, customerId: string): Promise<void> {
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

    if (meses && meses.length >= 1) {
      meses.forEach(async (mes) => {
        await this.prismaClient.expensesMonths.updateMany({
          where: {
            despesaId: id,
            customerId,
            ano: mes.ano,
            mes: mes.mes,
          },
          data: {
            valor: Number(mes.valor),
            status: Number(mes.status),
            descricao: mes.descricao,
            categoria: mes.categoria,
            observacao: mes.observacao,
            vencimento: mes.vencimento
          },
        });
      })
    }
  }


  public async editMonth(mes: ExpenseMonthDto): Promise<void> {
    const existingExpenseMonth = await this.prismaClient.expensesMonths.findUnique({
      where: {
        id: mes.id,
        mes: Number(mes.mes)
      },
    });

    if (!existingExpenseMonth) {
      throw new Error(`Despesa não encontrada para o mês ${mes.mes} e ano ${mes.ano}`);
    }

    const valor = parseFloat(Number(mes.valor).toFixed(2))

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
 
  public async delete(customerId: string, id: string, mes?: number): Promise<void> {
    if (mes) {
      await this.prismaClient.expensesMonths.deleteMany({
        where: {
          customerId: customerId,
          despesaId: id,
          mes: mes,
        },
      });
    } else {
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
    }
  }
}