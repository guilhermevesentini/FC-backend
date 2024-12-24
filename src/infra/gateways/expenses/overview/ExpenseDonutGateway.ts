import { ExpenseDonuOutputDto, ExpenseDonutInputDto } from "../../../../application/use-cases/expenses/overview/donut/ExpenseDonutUseCaseDto";

export interface ExpenseDonutGateway {
  donutTotal(input: ExpenseDonutInputDto): Promise<ExpenseDonuOutputDto>
}