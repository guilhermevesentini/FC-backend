import { CreateExpenseInputDto } from "../../../useCases/expenses/create/CreateExpenseUseCase";

export type ExpenseProps = {
  id: string;
  name: string;
  recurring: boolean
  dueDate: Date
  frequency: string
  replicate: boolean
  customerId: string
}

export class Expense {
  constructor(
    private props: ExpenseProps
  ){}

  public static async create(input: CreateExpenseInputDto): Promise<Expense> {
    const props: ExpenseProps = {
      id: input.id,
      name: input.name,
      recurring: input.recurring,
      dueDate: input.dueDate,
      frequency: input.frequency,
      replicate: input.replicate,
      customerId: input.customerId,
    };

    return new Expense(props);
  }

  public static with(props: ExpenseProps): Expense {
    return new Expense(props);
  }

  public get expense() {
    return this.props;
  }
}