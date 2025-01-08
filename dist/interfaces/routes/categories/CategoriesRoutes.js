"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
const CreateCategoryUseCase_1 = require("../../../application/use-cases/categories/CreateCategoryUseCase");
const DeleteCategoryUseCase_1 = require("../../../application/use-cases/categories/DeleteCategoryUseCase");
const EditCategoryUseCase_1 = require("../../../application/use-cases/categories/EditCategoryUseCase");
const GetCategoriesUseCase_1 = require("../../../application/use-cases/categories/GetCategoriesUseCase");
const CreateCategoriesExpress_1 = require("../../../infra/api/routes/categories/CreateCategoriesExpress");
const DeleteCategoryExpress_1 = require("../../../infra/api/routes/categories/DeleteCategoryExpress");
const EditCategoriesExpress_1 = require("../../../infra/api/routes/categories/EditCategoriesExpress");
const GetCategoriesExpress_1 = require("../../../infra/api/routes/categories/GetCategoriesExpress");
const prisma_1 = require("../../../infra/config/prisma/prisma");
const CategoriesRepositorPrisma_1 = require("../../../infra/repositories/categories/CategoriesRepositorPrisma");
const categoryRepository = CategoriesRepositorPrisma_1.CategoriesRepositoryPrisma.build(prisma_1.prisma);
const getCategoriesUseCase = GetCategoriesUseCase_1.GetCategoryUseCase.create(categoryRepository);
const createCategoriesUseCase = CreateCategoryUseCase_1.CreateCategoryUseCase.create(categoryRepository);
const deleteCategoriesUseCase = DeleteCategoryUseCase_1.DeleteCategoryUseCase.create(categoryRepository);
const editCategoriesUseCase = EditCategoryUseCase_1.EditCategoryUseCase.create(categoryRepository);
exports.categoriesRoutes = [
    CreateCategoriesExpress_1.CreateCategoriesRoute.create(createCategoriesUseCase),
    GetCategoriesExpress_1.GetCategoriesRoute.create(getCategoriesUseCase),
    EditCategoriesExpress_1.EditCategoriesRoute.create(editCategoriesUseCase),
    DeleteCategoryExpress_1.DeleteCategoriesRoute.create(deleteCategoriesUseCase)
];
