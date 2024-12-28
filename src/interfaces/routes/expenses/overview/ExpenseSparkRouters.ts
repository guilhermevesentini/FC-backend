import { OverviewSparkTotalUseCase } from "../../../../application/use-cases/overview/OverviewSparkTotalUseCase";
import { OverviewSparkTotalRoute } from "../../../../infra/api/routes/overview/OverviewSparkTotalExpress";
import { prisma } from "../../../../infra/config/prisma/prisma";
import { OverviewSparksRepositoryPrisma } from "../../../../infra/repositories/overview/OverviewSparksRepository";

const OverviewSparksRepository = OverviewSparksRepositoryPrisma.build(prisma);

const getOverviewSparkTotalUsecase = OverviewSparkTotalUseCase.create(OverviewSparksRepository);

export const overviewSparksRoutes = [
  OverviewSparkTotalRoute.create(getOverviewSparkTotalUsecase)
];