import { OverviewDonutUseCase } from "../../../../application/use-cases/overview/OverviewDonutUseCase";
import { OverviewResumoMovimentoUseCase } from "../../../../application/use-cases/overview/OverviewResumoMovimentoUseCase";
import { OverviewSparkTotalUseCase } from "../../../../application/use-cases/overview/OverviewSparkTotalUseCase";
import { OverviewDonutRoute } from "../../../../infra/api/routes/overview/OverviewDonutExpress";
import { OverviewResumoMovimentosRoute } from "../../../../infra/api/routes/overview/OverviewResumoMovimentosExpress";
import { OverviewSparkTotalRoute } from "../../../../infra/api/routes/overview/OverviewSparkTotalExpress";
import { prisma } from "../../../../infra/config/prisma/prisma";
import { OverviewSparksRepositoryPrisma } from "../../../../infra/repositories/overview/OverviewRepository";

const OverviewRepository = OverviewSparksRepositoryPrisma.build(prisma);

const getOverviewSparkTotalUsecase = OverviewSparkTotalUseCase.create(OverviewRepository);
const getOverviewDonutTotalUsecase = OverviewDonutUseCase.create(OverviewRepository);
const getOverviewResumoMovimentosUsecase = OverviewResumoMovimentoUseCase.create(OverviewRepository);

export const overviewRoutes = [
  OverviewSparkTotalRoute.create(getOverviewSparkTotalUsecase),
  OverviewDonutRoute.create(getOverviewDonutTotalUsecase),
  OverviewResumoMovimentosRoute.create(getOverviewResumoMovimentosUsecase),
];