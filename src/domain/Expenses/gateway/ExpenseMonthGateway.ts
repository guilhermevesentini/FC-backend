import { CreateExpenseMonthOutputDto } from "../../../useCases/expenses/create/CreateExpenseMonthUseCase"

export interface ExpenseMonthGateway {
  //getMonths(customerId: string): Promise<IExpenseMonth[]>
  create(mes: CreateExpenseMonthOutputDto[]): Promise<void>
  findByMonthYearAndCustomer(mes: number, ano: number, customerId: string): Promise<CreateExpenseMonthOutputDto[]>
}