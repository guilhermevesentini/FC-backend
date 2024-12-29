"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incomeRoutes = void 0;
const CreateIncomeUseCase_1 = require("../../../application/use-cases/income/CreateIncomeUseCase");
const DeleteIncomeUseCase_1 = require("../../../application/use-cases/income/DeleteIncomeUseCase");
const EditIncomeUseCase_1 = require("../../../application/use-cases/income/EditIncomeUseCase");
const GetIncomeUseCase_1 = require("../../../application/use-cases/income/GetIncomeUseCase");
const CreateIncomeExpress_1 = require("../../../infra/api/routes/income/CreateIncomeExpress");
const DeleteIncomeExpress_1 = require("../../../infra/api/routes/income/DeleteIncomeExpress");
const EditIncomeExpress_1 = require("../../../infra/api/routes/income/EditIncomeExpress");
const GetIncomeExpress_1 = require("../../../infra/api/routes/income/GetIncomeExpress");
const prisma_1 = require("../../../infra/config/prisma/prisma");
const IncomeRepositoryPrisma_1 = require("../../../infra/repositories/income/IncomeRepositoryPrisma");
const IncomeRepository = IncomeRepositoryPrisma_1.IncomeRepositoryPrisma.build(prisma_1.prisma);
const createIncomeMonthUsecase = CreateIncomeUseCase_1.CreateIncomeUseCase.create(IncomeRepository);
const getIncomeMonthUsecase = GetIncomeUseCase_1.GetIncomeUseCase.create(IncomeRepository);
const editIncomeMonthUsecase = EditIncomeUseCase_1.EditIncomeUseCase.create(IncomeRepository);
const deleteIncomeMonthUsecase = DeleteIncomeUseCase_1.DeleteIncomeUseCase.create(IncomeRepository);
exports.incomeRoutes = [
    CreateIncomeExpress_1.CreateIncomeRoute.create(createIncomeMonthUsecase),
    GetIncomeExpress_1.GetIncomeRoute.create(getIncomeMonthUsecase),
    EditIncomeExpress_1.EditIncomeRoute.create(editIncomeMonthUsecase),
    DeleteIncomeExpress_1.DeleteIncomeRoute.create(deleteIncomeMonthUsecase),
];
