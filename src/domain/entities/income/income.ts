import { IncomeDto } from "../../../application/dtos/IncomeDto";

export class Income {

  constructor(
    private props: IncomeDto
  ) {}

  public static create(input: IncomeDto): IncomeDto {
    if (!input.nome) {
      throw new Error("Nome é obrigatório.");
    }

    const props: IncomeDto = {
      id: input.id,
      nome: input.nome,
      recebimento: input.recebimento,
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

  public static with(props: IncomeDto): IncomeDto {
    return props;
  }

  public get expense() {
    return this.props;
  }
}