import { CreateExpenseMonthOutputDto } from "../../../useCases/expenses/create/CreateExpenseMonthUseCase"
import { ExpenseMonthOutputDto } from "../../../useCases/expenses/get/GetExpensesMonthUseCase"

export class ExpenseMonth {
  constructor(
    private props: CreateExpenseMonthOutputDto
  ){}

  public static async create(input: CreateExpenseMonthOutputDto): Promise<CreateExpenseMonthOutputDto> {
    const expenses = {
      id: input.id,
      month: input.month,
      year: input.year,
      value: input.value,
      status: input.status,
      description: input.description,
      customerId: input.customerId,
      dueDate: input.dueDate,
      comment: input.comment,
    };

    return expenses;
  }

  public static with(props: CreateExpenseMonthOutputDto): ExpenseMonthOutputDto {
    return {
      id: props.id,
      month: props.month,
      year: props.year,
      value: props.value,
      status: props.status,
      description: props.description,
      customerId: props.customerId,
      dueDate: props.dueDate,
      comment: props.comment,
    }
  }

  public get expenseMonth() {
    return this.props;
  }
}