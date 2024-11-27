import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import { ExpenseGateway } from "../../../domain/Expenses/gateway/DespesaGateway";
import { Expense } from "../../../domain/Expenses/entity/expense";
import { IExpense } from "../../../domain/_interfaces/IDespesas";

export class CreateExpenseRepositoryPrisma implements ExpenseGateway {

  private constructor(private readonly prismaClient: PrismaClient){}
  
  public static build(prismaClient: PrismaClient){
    return new CreateExpenseRepositoryPrisma(prismaClient)
  }

  //modelar para o banco
  public async create(expense: Expense): Promise<void> {
    const data = {
      id: uuidv4(),
      name: expense.expense.name,
      recurring: expense.expense.recurring,
      dueDate: expense.expense.dueDate,
      frequency: expense.expense.frequency,
      replicate: expense.expense.replicate,
      customerId: expense.expense.customerId,
    }   

    await this.prismaClient.expenses.create({
      data
    })
  }

  obter(): Promise<IExpense[]> {
    throw new Error("Method not implemented.");
  }
  obterDespesa(username: string): Promise<IExpense> {
    throw new Error("Method not implemented.");
  }
  obterPerMonth(username: string): Promise<IExpense[]> {
    throw new Error("Method not implemented.");
  }
  editar(username: string): Promise<IExpense | undefined> {
    throw new Error("Method not implemented.");
  }
  excluir(username: string): Promise<IExpense | undefined> {
    throw new Error("Method not implemented.");
  }
}