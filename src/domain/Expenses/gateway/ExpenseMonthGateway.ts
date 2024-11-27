import { CreateExpenseMonthOutputDto } from "../../../useCases/expenses/create/CreateExpenseMonthUseCase"

export interface ExpenseMonthGateway {
  //getMonths(customerId: string): Promise<IExpenseMonth[]>
  create(month: CreateExpenseMonthOutputDto[]): Promise<void>
  findByMonthYearAndCustomer(month: number, year: number, customerId: string): Promise<CreateExpenseMonthOutputDto[]>
}