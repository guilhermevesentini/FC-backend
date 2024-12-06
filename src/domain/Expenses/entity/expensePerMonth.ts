import { CreateExpenseInputDto } from "../../../useCases/expenses/create/CreateExpenseUseCase";
import { ExpensePerMonthOutputDto, ExpensePerMonthResponseDto, GetExpensePerMonthInputDto } from "../../../useCases/expenses/get/GetExpensePerMonthUseCase";

export type ExpensePerMonthProps = { 
  id: string;
  nome: string;
  recorrente: string
  vencimento: Date
  frequencia: string
  replicar: boolean
  customerId: string
  meses: ExpensePerMonthResponseDto[]
}

export class ExpensePerMonth {
  constructor(
    private props: ExpensePerMonthProps
  ){}

  public static async create(input: ExpensePerMonthOutputDto): Promise<ExpensePerMonth> {
    const props: ExpensePerMonthProps = {
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

  public static with(props: ExpensePerMonthProps): ExpensePerMonth {
    return new ExpensePerMonth(props);
  }

  public get expense() {
    return this.props;
  }
}