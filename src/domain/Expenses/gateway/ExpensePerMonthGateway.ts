import { ExpensePerMonthOutputDto } from "../../../useCases/expenses/get/GetExpensePerMonthUseCase"

export interface ExpensePerMonthGateway {
  getExpensePerMonth(mes: number, ano: number, customerId: string): Promise<ExpensePerMonthOutputDto[]>
}