import { Expense } from "../../../domain/entities/expenses/expense"
import { CreateExpenseMonthOutputDto, EditPerMonthInputDto, ExpensePerMonthOutputDto, IExpense } from "../../../domain/interfaces/IExpense"


export interface ExpenseGateway {
  create(expense: Expense): Promise<Expense>
  createMonth(mes: CreateExpenseMonthOutputDto[]): Promise<void>
  edit(uexpense: EditPerMonthInputDto, customerId: string): Promise<void>
  delete(customerId: string, id: string, mes?: number): Promise<void>
  findByMonthYearAndCustomer(mes: number, ano: number, customerId: string): Promise<CreateExpenseMonthOutputDto[]>
  getExpensePerMonth(mes: number, ano: number, customerId: string): Promise<ExpensePerMonthOutputDto[]>
}