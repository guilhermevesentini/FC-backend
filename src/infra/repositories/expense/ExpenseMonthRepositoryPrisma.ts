import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import { ExpenseMonthOutputDto } from "../../../useCases/expenses/get/GetExpensesMonthUseCase";
import { ExpenseMonthGateway } from "../../../domain/expenses/gateway/ExpenseMonthGateway";
import { CreateExpenseMonthOutputDto } from "../../../useCases/expenses/create/CreateExpenseMonthUseCase";

export class ExpenseMonthRepositoryPrisma implements ExpenseMonthGateway {

  private constructor(private readonly prismaClient: PrismaClient){}
  
  public static build(prismaClient: PrismaClient){
    return new ExpenseMonthRepositoryPrisma(prismaClient)
  }

  //modelar para o banco
  public async create(expense: CreateExpenseMonthOutputDto[]): Promise<void> {
    
    const data = expense.map((m) => ({
      id: uuidv4(),
      mes: m.mes,
      ano: m.ano,
      valor: Number(m.valor),
      status: Number(m.status),
      despesaId: m.despesaId,
      descricao: m.descricao,
      customerId: m.customerId,
      vencimento: m.vencimento,
      observacao: m.observacao,
    }));

    console.log(expense)   
    console.log(data)    

    await this.prismaClient.expensesMonths.createMany({
      data
    })
  }

  public async findByMonthYearAndCustomer(mes: number, ano: number, customerId: string): Promise<ExpenseMonthOutputDto[]> {
    console.log('expense', {mes, ano, customerId});
    const expenses = await this.prismaClient.expensesMonths.findMany({
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

    console.log('expenses', expenses);

    const formattedExpenses: ExpenseMonthOutputDto[] = expenses.map((expense) => ({
      id:  expense.id,
      mes: expense.mes,
      despesaId: expense.despesaId,
      ano: expense.ano,
      valor: expense.valor.toString(),
      status: expense.status.toString(),
      descricao: expense.descricao,
      customerId: expense.customerId,
      vencimento: expense.vencimento,
      observacao: expense.observacao,
    }));

    return formattedExpenses;
  }
}