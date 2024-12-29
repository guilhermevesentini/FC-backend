
import { OverviewGateway } from "../../../infra/gateways/overview/OverviewGateway";
import { OverviewResumoMovimentoOutputDto, OverviewSparkTotalInputDto, OverviewSparkTotalOutputDto } from "../../dtos/overviewDto";
import { UseCase } from "../UseCase";

export class OverviewResumoMovimentoUseCase implements UseCase<string, OverviewResumoMovimentoOutputDto> {
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

  public async execute(costumerId: string): Promise<OverviewResumoMovimentoOutputDto> {
    const ValuesFromDB = await this.overviewGateway.movimentos(costumerId);
  
    const output: OverviewResumoMovimentoOutputDto = {
      despesas: ValuesFromDB.despesas,
      balanco: ValuesFromDB.balanco,
      receitas: ValuesFromDB.receitas
    }

    return output

    //return this.loginPresenter.login(output);
  }
}