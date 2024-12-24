import { ExpenseDto } from "../../../application/dtos/expensesDto"
import { ExpenseModelInputDto } from "../../../domain/interfaces/IExpense"


export interface ExpenseGateway {
  create(expense: ExpenseDto): Promise<ExpenseDto>
  get(mes: number, ano: number, customerId: string): Promise<ExpenseDto[]>
  edit(uexpense: ExpenseDto, customerId: string): Promise<void>
  editAll(expense: ExpenseModelInputDto, customerId: string): Promise<void>
  delete(customerId: string, id: string, mes?: number): Promise<void>
}