import { OverviewDonuOutputDto, OverviewDonutInputDto, OverviewResumoMovimentoOInputDto, OverviewResumoMovimentoOutputDto, OverviewSparkTotalInputDto, OverviewSparkTotalOutputDto } from "../../../application/dtos/overviewDto";

export interface OverviewGateway {
  sparkTotal(input: OverviewSparkTotalInputDto): Promise<OverviewSparkTotalOutputDto>
  donutTotal(input: OverviewDonutInputDto): Promise<OverviewDonuOutputDto>
  movimentos(input: OverviewResumoMovimentoOInputDto): Promise<OverviewResumoMovimentoOutputDto>
}