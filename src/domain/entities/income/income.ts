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
      recorrente: input.recorrente,
      recebimento: input.recebimento,
      frequencia: input.frequencia,
      replicar: input.replicar,
      customerId: input.customerId,
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