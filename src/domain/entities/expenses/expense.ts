import { ExpenseDto } from "../../../application/dtos/expenses/expensesDto";

export class Expense {
  constructor(
    private props: ExpenseDto
  ){}

  public static async create(input: ExpenseDto): Promise<ExpenseDto> {
    const props: ExpenseDto = {
      id: input.id,
      nome: input.nome,
      recorrente: input.recorrente,
      vencimento: input.vencimento,
      frequencia: input.frequencia,
      replicar: input.replicar,
      customerId: input.customerId,
      
    };

    return props;
  }

  public static with(props: ExpenseDto): ExpenseDto {
    return props;
  }

  public get expense() {
    return this.props;
  }
}