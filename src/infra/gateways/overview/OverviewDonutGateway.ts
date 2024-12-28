import { OverviewDonuOutputDto, OverviewDonutInputDto } from "../../../application/dtos/overviewDto";

export interface OverviewDonutGateway {
  donutTotal(input: OverviewDonutInputDto): Promise<OverviewDonuOutputDto>
}