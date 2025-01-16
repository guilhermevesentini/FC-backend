export type OverviewDonutInputDto = {
  inicio: Date
  fim: Date
  customerId: string
}

export type OverviewDonuOutputDto = {
  labels: string[]
  values: number[]
}

export type OverviewSparksOutputItem = {
  value: number,
  values: number[]
}

export type OverviewSparkTotalInputDto = {
  inicio: Date
  fim: Date 
  customerId: string
}

export type OverviewSparkTotalOutputDto = {
  totalReceitas: OverviewSparksOutputItem
  totalDespesas: OverviewSparksOutputItem
  pendente: OverviewSparksOutputItem
  balanco: OverviewSparksOutputItem  
}

export type OverviewResumoMovimentoOInputDto = {
  customerId: string
  ano: number
}

export type OverviewResumoMovimentoOutputDto = {
  despesas: number[]
  receitas: number[]
  balanco: number[]
}