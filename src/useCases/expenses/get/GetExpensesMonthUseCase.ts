import { ExpenseMonthGateway } from "../../../domain/expenses/gateway/ExpenseMonthGateway";
import { UseCase } from "../../usercase";

export type GetExpenseMonthInputDto = {
  month: number
  year: number
  customerId: string
};

export type ExpenseMonthOutputDto = {
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

export class GetExpenseMonthUseCase implements UseCase<GetExpenseMonthInputDto, ExpenseMonthOutputDto[]>{
  private constructor(
    private readonly expenseMonthGateway: ExpenseMonthGateway
  ) {}

  public static create(
    expenseMonthGateway: ExpenseMonthGateway
  ): GetExpenseMonthUseCase {
    return new GetExpenseMonthUseCase(expenseMonthGateway);
  }

  public async execute(input: GetExpenseMonthInputDto): Promise<ExpenseMonthOutputDto[]> {
    const months = await this.expenseMonthGateway.findByMonthYearAndCustomer(input.month, input.year, input.customerId);

    const output: ExpenseMonthOutputDto[] = months.map(month => ({
      id: month.id,
      month: month.month,
      year: month.year,
      value: month.value,
      status: month.status,
      description: month.description,
      customerId: month.customerId,
      dueDate: month.dueDate,
      comment: month.comment
    }));

    return output.map((expense) => this.presentOutput(expense));
  }  

  private presentOutput(expense: ExpenseMonthOutputDto): ExpenseMonthOutputDto { 
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
    };
  }
}