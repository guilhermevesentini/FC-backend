import { CreateExpenseMonthOutputDto } from "../../../useCases/expenses/create/CreateExpenseMonthUseCase"
import { ExpensePerMonthOutputDto, IExpense } from "../../_interfaces/IExpense"
import { Expense } from "../entity/expense"

export interface ExpenseGateway {
  obter(): Promise<IExpense[]>
  getExpense(username: string): Promise<IExpense>
  create(expense: Expense): Promise<Expense>
  createMonth(mes: CreateExpenseMonthOutputDto[]): Promise<void>
  edit(username: string): Promise<IExpense | undefined>
  delete(username: string): Promise<IExpense | undefined>
  findByMonthYearAndCustomer(mes: number, ano: number, customerId: string): Promise<CreateExpenseMonthOutputDto[]>
  getExpensePerMonth(mes: number, ano: number, customerId: string): Promise<ExpensePerMonthOutputDto[]>
}