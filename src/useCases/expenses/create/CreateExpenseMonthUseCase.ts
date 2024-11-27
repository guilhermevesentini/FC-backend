import { ExpenseMonth } from "../../../domain/expenses/entity/expenseMonth";
import { ExpenseMonthGateway } from "../../../domain/expenses/gateway/ExpenseMonthGateway";
import { UseCase } from "../../usercase"

export type CreateExpenseMonthInputDto = {
  id: string
  month: number
  year: number
  value: string
  status: string
  description: string  
  customerId: string
  dueDate: Date;
  comment: string
};

export type CreateExpenseMonthOutputDto = {
  id: string
  month: number
  year: number
  value: string
  status: string
  description: string  
  customerId: string
  dueDate: Date;
  comment: string
};

export class CreateExpenseMonthUseCase implements UseCase<CreateExpenseMonthInputDto[], CreateExpenseMonthOutputDto[]>{
  private constructor(
    private readonly expenseMonthGateway: ExpenseMonthGateway
  ) {}

  public static create(
    expenseMonthGateway: ExpenseMonthGateway
  ): CreateExpenseMonthUseCase {
    return new CreateExpenseMonthUseCase(expenseMonthGateway);
  }

  public async execute(month: CreateExpenseMonthOutputDto[]): Promise<CreateExpenseMonthOutputDto[]> {
    const aMonth = await Promise.all(
      month.map(async (m) => {
        return await ExpenseMonth.create(m);
      })
    );

    await this.expenseMonthGateway.create(aMonth)

    const output: CreateExpenseMonthOutputDto[] = aMonth.map((m) => this.presentOutput(m))

    return output
  }  

  private presentOutput(expense: CreateExpenseMonthOutputDto): CreateExpenseMonthOutputDto {
    return {
      id: expense.id,
      month: expense.month,
      year: expense.year,
      value: expense.value,
      status: expense.status,
      description: expense.description,
      customerId: expense.customerId,
      dueDate: expense.dueDate,
      comment: expense.comment,
    }
  }
}