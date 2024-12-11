import { ExpenseDto, ExpensePerMonthOutputDto } from "../../../application/dtos/expenses/expensesDto"
import { CreateExpenseMonthOutputDto, EditPerMonthInputDto } from "../../../domain/interfaces/IExpense"


export interface ExpenseGateway {
  create(expense: ExpenseDto): Promise<ExpenseDto>
  edit(uexpense: EditPerMonthInputDto, customerId: string): Promise<void>
  delete(customerId: string, id: string, mes?: number): Promise<void>
  findByMonthYearAndCustomer(mes: number, ano: number, customerId: string): Promise<CreateExpenseMonthOutputDto[]>
  getExpensePerMonth(mes: number, ano: number, customerId: string): Promise<ExpensePerMonthOutputDto[]>
}