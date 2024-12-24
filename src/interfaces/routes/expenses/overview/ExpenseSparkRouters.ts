import { ExpenseSparkTotalUseCase } from "../../../../application/use-cases/expenses/overview/sparks/ExpenseSparkTotalUseCase";
import { ExpenseSparkTotalRoute } from "../../../../infra/api/routes/expenses/overview/sparks/ExpenseSparkTotalExpress";
import { prisma } from "../../../../infra/config/prisma/prisma";
import { ExpenseSparksRepositoryPrisma } from "../../../../infra/repositories/expense/overview/ExpenseSparksRepository";

const ExpenseSparksRepository = ExpenseSparksRepositoryPrisma.build(prisma);

const getExpenseSparkTotalUsecase = ExpenseSparkTotalUseCase.create(ExpenseSparksRepository);

export const expenseSparksRoutes = [
  ExpenseSparkTotalRoute.create(getExpenseSparkTotalUsecase)
];