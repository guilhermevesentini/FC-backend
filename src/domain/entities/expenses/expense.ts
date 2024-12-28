import { ExpenseDto } from "../../../application/dtos/expensesDto";

export class Expense {

  constructor(
    private props: ExpenseDto
  ) {}

  public static create(input: ExpenseDto): ExpenseDto {
    if (!input.nome) {
      throw new Error("Nome é obrigatório.");
    }
    
    const props: ExpenseDto = {
      id: input.id,
      nome: input.nome,
      vencimento: input.vencimento,
      replicar: input.replicar,
      customerId: input.customerId,
      tipoLancamento: input.tipoLancamento,
      range: {
        inicio: input.range?.inicio || undefined,
        fim: input.range?.fim || undefined
      },
      meses: input.meses
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