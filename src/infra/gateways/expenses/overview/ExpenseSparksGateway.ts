import { ExpenseSparkTotalInputDto, ExpenseSparkTotalOutputDto } from "../../../../application/use-cases/expenses/overview/sparks/EXpenseSparkUseCaseDto";

export interface ExpenseSparksGateway {
  sparkTotal(input: ExpenseSparkTotalInputDto): Promise<ExpenseSparkTotalOutputDto>
}