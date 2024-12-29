
import { OverviewGateway } from "../../../infra/gateways/overview/OverviewGateway";
import { OverviewDonuOutputDto, OverviewDonutInputDto } from "../../dtos/overviewDto";
import { UseCase } from "../UseCase";

export class OverviewDonutUseCase implements UseCase<OverviewDonutInputDto, OverviewDonuOutputDto> {
  private constructor(
      private readonly overviewDonutGateway: OverviewGateway
    ) {}
  
    public static create(
      overviewDonutGateway: OverviewGateway
    ): OverviewDonutUseCase {
      return new OverviewDonutUseCase(overviewDonutGateway);
  }
  
  public async execute(input: OverviewDonutInputDto): Promise<OverviewDonuOutputDto> {
      const donutFromDB = await this.overviewDonutGateway.donutTotal(input);
    
      const output: OverviewDonuOutputDto = {
        labels: donutFromDB.labels,
        values: donutFromDB.values
      }
  
      return output
  
      //return this.loginPresenter.login(output);
    }
}