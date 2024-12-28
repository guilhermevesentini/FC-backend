import { OverviewSparksGateway } from "../../../infra/gateways/overview/OverviewSparksGateway";
import { OverviewSparkTotalInputDto, OverviewSparkTotalOutputDto } from "../../dtos/overviewDto";
import { UseCase } from "../UseCase";

export class OverviewSparkTotalUseCase implements UseCase<OverviewSparkTotalInputDto, OverviewSparkTotalOutputDto> {
  //private loginPresenter: LoginPresenter

  private constructor(
    private readonly overviewSparkGateway: OverviewSparksGateway
  ) {
    //this.loginPresenter = new LoginPresenter
  }

  public static create(
    overviewSparkGateway: OverviewSparksGateway
  ): OverviewSparkTotalUseCase {
    return new OverviewSparkTotalUseCase(overviewSparkGateway);
  }

  public async execute(input: OverviewSparkTotalInputDto): Promise<OverviewSparkTotalOutputDto> {
    const totalFromDB = await this.overviewSparkGateway.sparkTotal(input);
  
    const output: OverviewSparkTotalOutputDto = {
      totalReceitas: {
        value: totalFromDB.totalReceitas.value,
        values: totalFromDB.totalReceitas.values
      },
      totalDespesas: {
        value: totalFromDB.totalDespesas.value,
        values: totalFromDB.totalDespesas.values
      },
      pendente: {
        value: totalFromDB.pendente.value,
        values: totalFromDB.pendente.values
      },
      balanco: {
        value: totalFromDB.balanco.value,
        values: totalFromDB.balanco.values
      }
    }

    return output

    //return this.loginPresenter.login(output);
  }
}