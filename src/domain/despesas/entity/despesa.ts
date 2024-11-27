import { CriarDespesaInputDto } from "../../../useCases/despesas/CriarDespesaUseCase";

export type DespesaProps = {
  id: string;
  nome: string;
  recorrente: boolean
  vencimento: Date
  frequencia: string
  replicar: boolean
  customerId: string
}

export class Despesa {
  constructor(
    private props: DespesaProps
  ){}

  public static async create(input: CriarDespesaInputDto): Promise<Despesa> {
    const props: DespesaProps = {
      id: input.id,
      nome: input.nome,
      recorrente: input.recorrente,
      vencimento: input.vencimento,
      frequencia: input.frequencia,
      replicar: input.replicar,
      customerId: input.customerId,
    };

    return new Despesa(props);
  }

  public static with(props: DespesaProps): Despesa {
    return new Despesa(props);
  }

  public get despesa() {
    return this.props;
  }
}