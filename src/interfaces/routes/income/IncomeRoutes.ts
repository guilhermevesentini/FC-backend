import { CreateIncomeUseCase } from "../../../application/use-cases/income/CreateIncomeUseCase";
import { DeleteIncomeUseCase } from "../../../application/use-cases/income/DeleteIncomeUseCase";
import { EditIncomeUseCase } from "../../../application/use-cases/income/EditIncomeUseCase";
import { GetIncomeUseCase } from "../../../application/use-cases/income/GetIncomeUseCase";
import { CreateIncomeRoute } from "../../../infra/api/routes/income/CreateIncomeExpress";
import { DeleteIncomeRoute } from "../../../infra/api/routes/income/DeleteIncomeExpress";
import { EditIncomeRoute } from "../../../infra/api/routes/income/EditIncomeExpress";
import { GetIncomeRoute } from "../../../infra/api/routes/income/GetIncomeExpress";
import { prisma } from "../../../infra/config/prisma/prisma";
import { IncomeRepositoryPrisma } from "../../../infra/repositories/income/IncomeRepositoryPrisma";

const IncomeRepository = IncomeRepositoryPrisma.build(prisma);

const createIncomeMonthUsecase = CreateIncomeUseCase.create(IncomeRepository);
const getIncomeMonthUsecase = GetIncomeUseCase.create(IncomeRepository);
const editIncomeMonthUsecase = EditIncomeUseCase.create(IncomeRepository);
const deleteIncomeMonthUsecase = DeleteIncomeUseCase.create(IncomeRepository);

export const incomeRoutes = [
  CreateIncomeRoute.create(createIncomeMonthUsecase),
  GetIncomeRoute.create(getIncomeMonthUsecase),
  EditIncomeRoute.create(editIncomeMonthUsecase),
  DeleteIncomeRoute.create(deleteIncomeMonthUsecase),
];
