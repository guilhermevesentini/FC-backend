
import { OverviewDonutGateway } from "../../../infra/gateways/overview/OverviewDonutGateway";
import { OverviewDonuOutputDto, OverviewDonutInputDto } from "../../dtos/overviewDto";
import { UseCase } from "../UseCase";

export class OverviewDonutUseCase implements UseCase<OverviewDonutInputDto, OverviewDonuOutputDto> {
  private constructor(
      private readonly overviewDonutGateway: OverviewDonutGateway
    ) {}
  
    public static create(
      overviewDonutGateway: OverviewDonutGateway
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