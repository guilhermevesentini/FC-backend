import { Expense } from "../../../domain/Expenses/entity/expense";
import { ExpenseGateway } from "../../../domain/Expenses/gateway/ExpenseGateway";
import { UseCase } from "../../usercase"

export type CreateExpenseInputDto = {
  id: string;
  name: string;
  recurring: boolean
  dueDate: Date
  frequency: string
  replicate: boolean
  customerId: string
};

export type CreateExpenseOutputDto = {
  id: string;
  name: string;
  recurring: boolean
  dueDate: Date
  frequency: string
  replicate: boolean
  customerId: string
};

export class CreateExpenseUseCase implements UseCase<CreateExpenseInputDto, CreateExpenseOutputDto>{
  private constructor(
    private readonly expenseGateway: ExpenseGateway
  ) {}

  public static create(
    expenseGateway: ExpenseGateway
  ): CreateExpenseUseCase {
    return new CreateExpenseUseCase(expenseGateway);
  }

  public async execute(expense: CreateExpenseInputDto): Promise<CreateExpenseOutputDto> {
    const aExpense = await Expense.create(expense);

    await this.expenseGateway.create(aExpense)

    const output: CreateExpenseOutputDto = this.presentOutput(aExpense)

    return output
  }  

  private presentOutput(expense: Expense): CreateExpenseOutputDto {
    const output: CreateExpenseOutputDto = {
      id: expense.expense.id,
      customerId: expense.expense.customerId,
      dueDate: expense.expense.dueDate,
      frequency: expense.expense.customerId,
      name: expense.expense.customerId,
      recurring: expense.expense.recurring,
      replicate: expense.expense.replicate
    }

    return output
  }
}