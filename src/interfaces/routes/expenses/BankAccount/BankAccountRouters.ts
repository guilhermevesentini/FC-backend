import { CreateBankAccountUseCase } from "../../../../application/use-cases/bankCards/CreateBankAccountUseCase";
import { DeleteBankAccountUseCase } from "../../../../application/use-cases/bankCards/DeleteBanckAccountUseCase";
import { GetBankAccountUseCase } from "../../../../application/use-cases/bankCards/GetBankAccountUseCase";
import { CreateBankAccountRoute } from "../../../../infra/api/routes/expenses/bankAccount/CreateBankAccountExpress";
import { DeleteBankAccountRoute } from "../../../../infra/api/routes/expenses/bankAccount/DeleteBankAccoutExpress";
import { GetBankAccountRoute } from "../../../../infra/api/routes/expenses/bankAccount/GetBankAccountExpress";
import { prisma } from "../../../../infra/config/prisma/prisma";
import { BankAccountRepositoryPrisma } from "../../../../infra/repositories/expense/BankAccount/BankAccountRepository";

const BankAccountRepository = BankAccountRepositoryPrisma.build(prisma);

const createBankAccountUsecase = CreateBankAccountUseCase.create(BankAccountRepository);
const getBankAccountUsecase = GetBankAccountUseCase.create(BankAccountRepository);
const deleteBankAccountUsecase = DeleteBankAccountUseCase.create(BankAccountRepository);

export const bankAccountRoutes = [
  CreateBankAccountRoute.create(createBankAccountUsecase),
  GetBankAccountRoute.create(getBankAccountUsecase),
  DeleteBankAccountRoute.create(deleteBankAccountUsecase)
];