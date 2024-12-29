"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseRoutes = void 0;
const CreateExpenseUseCase_1 = require("../../../application/use-cases/expenses/CreateExpenseUseCase");
const DeleteExpenseUseCase_1 = require("../../../application/use-cases/expenses/DeleteExpenseUseCase");
const EditExpenseUseCase_1 = require("../../../application/use-cases/expenses/EditExpenseUseCase");
const GetExpensesMonthUseCase_1 = require("../../../application/use-cases/expenses/GetExpensesMonthUseCase");
const CreateExpenseExpress_1 = require("../../../infra/api/routes/expenses/CreateExpenseExpress");
const DeleteExpenseExpress_1 = require("../../../infra/api/routes/expenses/DeleteExpenseExpress");
const EditExpenseExpress_1 = require("../../../infra/api/routes/expenses/EditExpenseExpress");
const GetExpensesEmpress_1 = require("../../../infra/api/routes/expenses/GetExpensesEmpress");
const prisma_1 = require("../../../infra/config/prisma/prisma");
const ExpenseRepositoryPrisma_1 = require("../../../infra/repositories/expense/ExpenseRepositoryPrisma");
const ExpenseRepository = ExpenseRepositoryPrisma_1.ExpenseRepositoryPrisma.build(prisma_1.prisma);
const getExpenseMonthUsecase = GetExpensesMonthUseCase_1.GetExpenseMonthUseCase.create(ExpenseRepository);
const CreateExpenseUsecase = CreateExpenseUseCase_1.CreateExpenseUseCase.create(ExpenseRepository);
const DeleteExpenseUsecase = DeleteExpenseUseCase_1.DeleteExpenseUseCase.create(ExpenseRepository);
const EditExpenseUsecase = EditExpenseUseCase_1.EditExpenseUseCase.create(ExpenseRepository);
exports.expenseRoutes = [
    GetExpensesEmpress_1.GetExpenseRoute.create(getExpenseMonthUsecase),
    CreateExpenseExpress_1.CreateExpenseRoute.create(CreateExpenseUsecase),
    DeleteExpenseExpress_1.DeleteExpenseRoute.create(DeleteExpenseUsecase),
    EditExpenseExpress_1.EditExpenseRoute.create(EditExpenseUsecase)
];
