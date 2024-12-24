export type ExpenseDonutInputDto = {
  inicio: Date
  fim: Date
  customerId: string
}

export type ExpenseDonuOutputDto = {
  labels: string[]
  values: number[]
}