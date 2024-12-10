import { ExpenseDto } from "../../../application/dtos/expenses/expensesDto"
import { CreateExpenseMonthOutputDto, EditPerMonthInputDto, ExpensePerMonthOutputDto } from "../../../domain/interfaces/IExpense"


export interface ExpenseGateway {
  create(expense: ExpenseDto): Promise<ExpenseDto>
  createMonth(mes: CreateExpenseMonthOutputDto[]): Promise<void>
  edit(uexpense: EditPerMonthInputDto, customerId: string): Promise<void>
  delete(customerId: string, id: string, mes?: number): Promise<void>
  findByMonthYearAndCustomer(mes: number, ano: number, customerId: string): Promise<CreateExpenseMonthOutputDto[]>
  getExpensePerMonth(mes: number, ano: number, customerId: string): Promise<ExpensePerMonthOutputDto[]>
}