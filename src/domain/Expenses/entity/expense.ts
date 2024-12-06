import { CreateExpenseInputDto } from "../../../useCases/expenses/create/CreateExpenseUseCase";

export type ExpenseProps = {
  id: string;
  nome: string;
  recorrente: string
  vencimento: Date
  frequencia: string
  replicar: boolean
  customerId: string
}

export class Expense {
  constructor(
    private props: ExpenseProps
  ){}

  public static async create(input: CreateExpenseInputDto): Promise<Expense> {
    const props: ExpenseProps = {
      id: input.id,
      nome: input.nome,
      recorrente: input.recorrente,
      vencimento: input.vencimento,
      frequencia: input.frequencia,
      replicar: input.replicar,
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