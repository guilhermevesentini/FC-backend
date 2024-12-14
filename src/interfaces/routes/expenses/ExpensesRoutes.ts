import { CreateExpenseUseCase } from "../../../application/use-cases/expenses/create/CreateExpenseUseCase";
import { DeleteExpenseUseCase } from "../../../application/use-cases/expenses/delete/DeleteExpenseUseCase";
import { EditExpenseUseCase } from "../../../application/use-cases/expenses/edit/EditExpenseUseCase";
import { GetExpenseMonthUseCase } from "../../../application/use-cases/expenses/get/GetExpensesMonthUseCase";
import { CreateExpenseRoute } from "../../../infra/api/routes/expenses/CreateExpenseExpress";
import { DeleteExpenseRoute } from "../../../infra/api/routes/expenses/DeleteExpenseExpress";
import { EditExpenseRoute } from "../../../infra/api/routes/expenses/EditExpenseExpress";
import { GetExpenseRoute } from "../../../infra/api/routes/expenses/GetExpensesEmpress";
import { prisma } from "../../../infra/config/prisma/prisma";
import { ExpenseRepositoryPrisma } from "../../../infra/repositories/expense/ExpenseRepositoryPrisma";

const ExpenseRepository = ExpenseRepositoryPrisma.build(prisma);

const getExpenseMonthUsecase = GetExpenseMonthUseCase.create(ExpenseRepository);
const CreateExpenseUsecase = CreateExpenseUseCase.create(ExpenseRepository);
const DeleteExpenseUsecase = DeleteExpenseUseCase.create(ExpenseRepository);
const EditExpenseUsecase = EditExpenseUseCase.create(ExpenseRepository);

export const expenseRoutes = [
  GetExpenseRoute.create(getExpenseMonthUsecase),
  CreateExpenseRoute.create(CreateExpenseUsecase),
  DeleteExpenseRoute.create(DeleteExpenseUsecase),
  EditExpenseRoute.create(EditExpenseUsecase)
];
