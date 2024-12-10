import { CreateExpenseInputDto, IExpense } from "../../interfaces/IExpense";

export class Expense {
  constructor(
    private props: IExpense
  ){}

  public static async create(input: CreateExpenseInputDto): Promise<Expense> {
    const props: IExpense = {
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

  public static with(props: IExpense): Expense {
    return new Expense(props);
  }

  public get expense() {
    return this.props;
  }
}