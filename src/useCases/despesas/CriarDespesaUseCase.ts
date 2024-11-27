import { IDespesa, IDespesaMes } from "../../domain/_interfaces/IDespesas"
import { Despesa } from "../../domain/despesas/entity/despesa";
import { DespesaGateway } from "../../domain/despesas/gateway/DespesaGateway"
import { UseCase } from "../usercase"

export type CriarDespesaInputDto = {
  id: string
  nome: string
  recorrente: boolean
  vencimento: Date
  frequencia: string
  replicar: boolean
  customerId: string
};

export type CriarDespesaOutputDto = {
  id: string;
};

export class CriarDespesaUseCase implements UseCase<CriarDespesaInputDto, CriarDespesaOutputDto>{
  private constructor(
    private readonly despesaGateway: DespesaGateway
  ) {}

  public static create(
    despesaGateway: DespesaGateway
  ): CriarDespesaUseCase {
    return new CriarDespesaUseCase(despesaGateway);
  }

  public async execute(despesa: CriarDespesaInputDto): Promise<CriarDespesaOutputDto> {
    const aDespesa = await Despesa.create(despesa);

    await this.despesaGateway.criar(aDespesa)

    const output: CriarDespesaOutputDto = this.presentOutput(aDespesa)

    return output
  }  

  private presentOutput(despesa: Despesa): CriarDespesaOutputDto {
    const output: CriarDespesaOutputDto = {
      id: despesa.despesa.id,
    }

    return output
  }
}