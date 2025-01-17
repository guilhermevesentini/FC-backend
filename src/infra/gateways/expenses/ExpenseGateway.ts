import { ExpenseDto, ExpenseInputDto, ExpenseMonthDto } from "../../../application/dtos/expensesDto"


export interface ExpenseGateway {
  create(expense: ExpenseDto, months: ExpenseMonthDto[]): Promise<ExpenseDto>
  get(mes: number, ano: number, customerId: string): Promise<ExpenseDto[]>
  edit(uexpense: ExpenseDto): Promise<void>
  editAll(expense: ExpenseInputDto, customerId: string): Promise<void>
  delete(customerId: string, id: string, mes?: number): Promise<void>
}