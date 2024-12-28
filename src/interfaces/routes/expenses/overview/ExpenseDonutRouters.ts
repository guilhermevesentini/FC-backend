import { OverviewDonutUseCase } from "../../../../application/use-cases/overview/OverviewDonutUseCase";
import { OverviewDonutRoute } from "../../../../infra/api/routes/overview/OverviewDonutExpress";
import { prisma } from "../../../../infra/config/prisma/prisma";
import { OverviewDonutRepositoryPrisma } from "../../../../infra/repositories/overview/OverviewDonutRepository";

const OverviewDonutRepository = OverviewDonutRepositoryPrisma.build(prisma);

const getOverviewDonutUsecase = OverviewDonutUseCase.create(OverviewDonutRepository);

export const overviewDonutRoutes = [
  OverviewDonutRoute.create(getOverviewDonutUsecase)
];