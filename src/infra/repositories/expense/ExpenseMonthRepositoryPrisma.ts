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
      month: m.month,
      year: m.year,
      value: Number(m.value),
      status: Number(m.status),
      description: m.description,
      customerId: m.customerId,
      dueDate: m.dueDate,
      comment: m.comment,
    }));

    await this.prismaClient.expensesMonths.createMany({
      data
    })
  }

  public async findByMonthYearAndCustomer(month: number, year: number, customerId: string): Promise<ExpenseMonthOutputDto[]> {
    console.log('expense', {month, year, customerId});
    const expenses = await this.prismaClient.expensesMonths.findMany({
      where: {
        month,
        year,
        customerId,
      },
      select: {
        id: true,
        month: true,
        year: true,
        value: true,
        status: true,
        description: true,
        customerId: true,
        dueDate: true,
        comment: true,
      },
    });

    console.log('expenses', expenses);

    const formattedExpenses: ExpenseMonthOutputDto[] = expenses.map((expense) => ({
      id:  expense.id,
      month: expense.month,
      year: expense.year,
      value: expense.value.toString(),
      status: expense.status.toString(),
      description: expense.description,
      customerId: expense.customerId,
      dueDate: expense.dueDate,
      comment: expense.comment,
    }));

    return formattedExpenses;
  }
}