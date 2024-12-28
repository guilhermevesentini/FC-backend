import { OverviewSparkTotalInputDto, OverviewSparkTotalOutputDto } from "../../../application/dtos/overviewDto";

export interface OverviewSparksGateway {
  sparkTotal(input: OverviewSparkTotalInputDto): Promise<OverviewSparkTotalOutputDto>
}