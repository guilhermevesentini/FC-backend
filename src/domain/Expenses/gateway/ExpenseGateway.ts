import { ExpenseMonthOutputDto } from "../../../useCases/expenses/get/GetExpensesMonthUseCase"
import { IExpense } from "../../_interfaces/IExpense"
import { Expense } from "../entity/expense"

export interface ExpenseGateway {
  obter(): Promise<IExpense[]>
  getExpense(username: string): Promise<IExpense>
  create(user: Expense): Promise<void>
  edit(username: string): Promise<IExpense | undefined>
  delete(username: string): Promise<IExpense | undefined>
}