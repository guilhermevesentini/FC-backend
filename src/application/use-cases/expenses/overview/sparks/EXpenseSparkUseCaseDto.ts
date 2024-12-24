export type ExpenseSparksOutputItem = {
  value: number,
  values: number[]
}

export type ExpenseSparkTotalInputDto = {
  inicio: Date
  fim: Date 
  customerId: string
}

export type ExpenseSparkTotalOutputDto = {
  total: ExpenseSparksOutputItem
  pendente: ExpenseSparksOutputItem
  pago: ExpenseSparksOutputItem
  balanco: ExpenseSparksOutputItem  
}