import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import { ExpenseGateway } from "../../gateways/expenses/ExpenseGateway";
import { ExpenseDto, ExpenseMonthDto } from "../../../application/dtos/expenses/expensesDto";
import { ExpenseModelInputDto } from "../../../domain/interfaces/IExpense";

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
      recorrente: expense.recorrente,
      vencimento: expense.vencimento,
      frequencia: expense.frequencia,
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
      },
    });

    const formattedExpenses: ExpenseDto[] = expenses.map((expense) => ({
      ...expense,
      meses: months.map((mes) => {
        return {
          id:  mes.id,
          mes: mes.mes,
          despesaId: mes.despesaId,
          ano: mes.ano,
          valor: mes.valor.toString(),
          status: mes.status.toString(),
          descricao: mes.descricao,
          customerId: mes.customerId,
          vencimento: mes.vencimento,
          observacao: mes.observacao
        }
      })
      
    }));

    return formattedExpenses;
  }

  
  public async edit(expense: ExpenseDto, customerId: string): Promise<void> {
    await this.prismaClient.expenses.update({
      where: { id: expense.id, customerId },
      data: {
        nome: expense.nome,
        recorrente: expense.recorrente,
        vencimento: expense.vencimento,
        frequencia: expense.frequencia,
        replicar: expense.replicar,
      },
    });

    if (expense.meses && expense.meses.length > 0) {
      const updatePromises = expense.meses.map((mes) =>
        this.editMonth(mes, customerId)
      );
      await Promise.all(updatePromises);
    }
  }

  public async editAll(expense: ExpenseModelInputDto, customerId: string): Promise<void> {
  // Atualizar a despesa principal
  await this.prismaClient.expenses.update({
    where: { id: expense.despesaId, customerId },
    data: {
      nome: expense.nome,
      recorrente: expense.recorrente,
      vencimento: expense.vencimento,
      frequencia: expense.frequencia,
      replicar: expense.replicar,
    },
  });

  // Atualizar os meses de 1 a 12 para a despesa
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // Atualizar os meses diretamente com o updateMany
  await this.prismaClient.expensesMonths.updateMany({
    where: {
      despesaId: expense.despesaId,
      customerId,
      ano: expense.ano,
      mes: { in: months }, // Filtra para os meses de 1 a 12
    },
    data: {
      valor: Number(expense.valor),
      status: Number(expense.status),
      descricao: expense.descricao,
      observacao: expense.observacao,
      vencimento: expense.vencimento
    },
  });
}


  public async editMonth(mes: ExpenseMonthDto, customerId: string): Promise<void> {
    const existingExpenseMonth = await this.prismaClient.expensesMonths.findFirst({
      where: {
        customerId,
        despesaId: mes.despesaId,
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
        ano: mes.ano,
        mes: mes.mes,
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