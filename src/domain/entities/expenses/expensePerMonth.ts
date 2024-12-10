import { ExpensePerMonthOutputDto, IExpensePerMonth } from "../../interfaces/IExpense";

export class ExpensePerMonth {
  constructor(
    private props: IExpensePerMonth
  ){}

  public static async create(input: ExpensePerMonthOutputDto): Promise<ExpensePerMonth> {
    const props: IExpensePerMonth = {
      id: input.id,
      nome: input.nome,
      recorrente: input.recorrente,
      vencimento: input.vencimento,
      frequencia: input.frequencia,
      replicar: input.replicar,
      customerId: input.customerId,
      meses: input.meses
    };

    return new ExpensePerMonth(props);
  }

  public static with(props: IExpensePerMonth): ExpensePerMonth {
    return new ExpensePerMonth(props);
  }

  public get expense() {
    return this.props;
  }
}