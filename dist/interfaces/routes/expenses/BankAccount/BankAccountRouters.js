"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bankAccountRoutes = void 0;
const CreateBankAccountUseCase_1 = require("../../../../application/use-cases/bankCards/CreateBankAccountUseCase");
const DeleteBanckAccountUseCase_1 = require("../../../../application/use-cases/bankCards/DeleteBanckAccountUseCase");
const GetBankAccountUseCase_1 = require("../../../../application/use-cases/bankCards/GetBankAccountUseCase");
const CreateBankAccountExpress_1 = require("../../../../infra/api/routes/expenses/bankAccount/CreateBankAccountExpress");
const DeleteBankAccoutExpress_1 = require("../../../../infra/api/routes/expenses/bankAccount/DeleteBankAccoutExpress");
const GetBankAccountExpress_1 = require("../../../../infra/api/routes/expenses/bankAccount/GetBankAccountExpress");
const prisma_1 = require("../../../../infra/config/prisma/prisma");
const BankAccountRepository_1 = require("../../../../infra/repositories/expense/BankAccount/BankAccountRepository");
const BankAccountRepository = BankAccountRepository_1.BankAccountRepositoryPrisma.build(prisma_1.prisma);
const createBankAccountUsecase = CreateBankAccountUseCase_1.CreateBankAccountUseCase.create(BankAccountRepository);
const getBankAccountUsecase = GetBankAccountUseCase_1.GetBankAccountUseCase.create(BankAccountRepository);
const deleteBankAccountUsecase = DeleteBanckAccountUseCase_1.DeleteBankAccountUseCase.create(BankAccountRepository);
exports.bankAccountRoutes = [
    CreateBankAccountExpress_1.CreateBankAccountRoute.create(createBankAccountUsecase),
    GetBankAccountExpress_1.GetBankAccountRoute.create(getBankAccountUsecase),
    DeleteBankAccoutExpress_1.DeleteBankAccountRoute.create(deleteBankAccountUsecase)
];
