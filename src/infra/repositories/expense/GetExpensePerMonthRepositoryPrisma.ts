import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import { ExpensePerMonthGateway } from "../../../domain/expenses/gateway/ExpensePerMonthGateway";
import { ExpensePerMonth } from "../../../domain/expenses/entity/expensePerMonth";
import { ExpensePerMonthOutputDto } from "../../../useCases/expenses/get/GetExpensePerMonthUseCase";

export class GetExpensePerMonthRepositoryPrisma implements ExpensePerMonthGateway {

  private constructor(private readonly prismaClient: PrismaClient){}
    
  public static build(prismaClient: PrismaClient){
    return new GetExpensePerMonthRepositoryPrisma(prismaClient)
  }

  //modelar para o banco
  public async create(expense: ExpensePerMonth): Promise<void> {
    const data = {
      id: uuidv4(),
      nome: expense.expense.nome,
      recorrente: expense.expense.recorrente,
      vencimento: expense.expense.vencimento,
      frequencia: expense.expense.frequencia,
      replicar: expense.expense.replicar,
      customerId: expense.expense.customerId,
    }   

    await this.prismaClient.expenses.create({
      data
    })
  }

  public async getExpensePerMonth(mes: number, ano: number, customerId: string): Promise<ExpensePerMonthOutputDto[]> {
    if(!mes || !ano || !customerId)  {
      return []
    }
    
    const expenses = await this.prismaClient.expenses.findMany({
      where: {
        customerId,
      },
      select: {
        id: true,
        nome: true,
        recorrente: true,
        vencimento: true,
        frequencia: true,
        replicar: true,
        customerId: true,
      },
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
        despesaId: true,
        descricao: true,
        customerId: true,
        vencimento: true,
        observacao: true
      },
    });

    console.log("expenses", expenses)
    console.log("months", months)
    const formattedExpenses = expenses.map((expense) => ({
      id: expense.id,
      nome: expense.nome,
      recorrente: expense.recorrente,
      vencimento: expense.vencimento,
      frequencia: expense.frequencia,
      replicar: expense.replicar,
      customerId: expense.customerId,
      meses: months
        .filter((month) => month.customerId === expense.customerId && month.despesaId === expense.id)
        .map((month) => ({
          id: month.id,
          mes: month.mes,
          ano: month.ano,
          valor: month.valor.toString(),
          status: month.status.toString(),
          despesaId: month.despesaId,
          descricao: month.descricao,
          customerId: month.customerId,
          vencimento: month.vencimento,
          observacao: month.observacao,
        })),
    }));

    return formattedExpenses;
  }

}