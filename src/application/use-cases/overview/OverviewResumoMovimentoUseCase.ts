
import { OverviewGateway } from "../../../infra/gateways/overview/OverviewGateway";
import { OverviewResumoMovimentoOInputDto, OverviewResumoMovimentoOutputDto } from "../../dtos/overviewDto";
import { UseCase } from "../UseCase";

export class OverviewResumoMovimentoUseCase implements UseCase<OverviewResumoMovimentoOInputDto, OverviewResumoMovimentoOutputDto> {
  //private loginPresenter: LoginPresenter

  private constructor(
    private readonly overviewGateway: OverviewGateway
  ) {
    //this.loginPresenter = new LoginPresenter
  }

  public static create(
    overviewGateway: OverviewGateway
  ): OverviewResumoMovimentoUseCase {
    return new OverviewResumoMovimentoUseCase(overviewGateway);
  }

  public async execute(input: OverviewResumoMovimentoOInputDto): Promise<OverviewResumoMovimentoOutputDto> {
    const ValuesFromDB = await this.overviewGateway.movimentos({customerId: input.customerId, ano: input.ano});
  
    const output: OverviewResumoMovimentoOutputDto = {
      despesas: ValuesFromDB.despesas,
      balanco: ValuesFromDB.balanco,
      receitas: ValuesFromDB.receitas
    }

    return output

    //return this.loginPresenter.login(output);
  }
}