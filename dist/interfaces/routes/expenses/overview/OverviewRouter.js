"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overviewRoutes = void 0;
const OverviewDonutUseCase_1 = require("../../../../application/use-cases/overview/OverviewDonutUseCase");
const OverviewResumoMovimentoUseCase_1 = require("../../../../application/use-cases/overview/OverviewResumoMovimentoUseCase");
const OverviewSparkTotalUseCase_1 = require("../../../../application/use-cases/overview/OverviewSparkTotalUseCase");
const OverviewDonutExpress_1 = require("../../../../infra/api/routes/overview/OverviewDonutExpress");
const OverviewResumoMovimentosExpress_1 = require("../../../../infra/api/routes/overview/OverviewResumoMovimentosExpress");
const OverviewSparkTotalExpress_1 = require("../../../../infra/api/routes/overview/OverviewSparkTotalExpress");
const prisma_1 = require("../../../../infra/config/prisma/prisma");
const OverviewRepository_1 = require("../../../../infra/repositories/overview/OverviewRepository");
const OverviewRepository = OverviewRepository_1.OverviewSparksRepositoryPrisma.build(prisma_1.prisma);
const getOverviewSparkTotalUsecase = OverviewSparkTotalUseCase_1.OverviewSparkTotalUseCase.create(OverviewRepository);
const getOverviewDonutTotalUsecase = OverviewDonutUseCase_1.OverviewDonutUseCase.create(OverviewRepository);
const getOverviewResumoMovimentosUsecase = OverviewResumoMovimentoUseCase_1.OverviewResumoMovimentoUseCase.create(OverviewRepository);
exports.overviewRoutes = [
    OverviewSparkTotalExpress_1.OverviewSparkTotalRoute.create(getOverviewSparkTotalUsecase),
    OverviewDonutExpress_1.OverviewDonutRoute.create(getOverviewDonutTotalUsecase),
    OverviewResumoMovimentosExpress_1.OverviewResumoMovimentosRoute.create(getOverviewResumoMovimentosUsecase),
];
