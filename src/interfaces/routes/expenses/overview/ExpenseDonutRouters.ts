import { ExpenseDonutUseCase } from "../../../../application/use-cases/expenses/overview/donut/ExpenseDonutUseCase";
import { ExpenseDonutRoute } from "../../../../infra/api/routes/expenses/overview/donut/ExpenseDonutExpress";
import { prisma } from "../../../../infra/config/prisma/prisma";
import { ExpenseDonutRepositoryPrisma } from "../../../../infra/repositories/expense/overview/ExpenseDonutRepository";

const ExpenseDonutRepository = ExpenseDonutRepositoryPrisma.build(prisma);

const getExpenseDonutUsecase = ExpenseDonutUseCase.create(ExpenseDonutRepository);

export const expenseDonutRoutes = [
  ExpenseDonutRoute.create(getExpenseDonutUsecase)
];