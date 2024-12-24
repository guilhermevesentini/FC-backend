import { CreateIncomeUseCase } from "../../../application/use-cases/income/CreateIncomeUseCase";
import { GetIncomeUseCase } from "../../../application/use-cases/income/GetIncomeUseCase";
import { CreateIncomeRoute } from "../../../infra/api/routes/income/CreateIncomeExpress";
import { GetIncomeRoute } from "../../../infra/api/routes/income/GetIncomeExpress";
import { prisma } from "../../../infra/config/prisma/prisma";
import { IncomeRepositoryPrisma } from "../../../infra/repositories/income/IncomeRepositoryPrisma";

const IncomeRepository = IncomeRepositoryPrisma.build(prisma);

const createIncomeMonthUsecase = CreateIncomeUseCase.create(IncomeRepository);
const getIncomeMonthUsecase = GetIncomeUseCase.create(IncomeRepository);

export const incomeRoutes = [
  CreateIncomeRoute.create(createIncomeMonthUsecase),
  GetIncomeRoute.create(getIncomeMonthUsecase),
];
