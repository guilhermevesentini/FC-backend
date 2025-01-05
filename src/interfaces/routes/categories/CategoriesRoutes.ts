import { CreateCategoryUseCase } from "../../../application/use-cases/categories/CreateCategoryUseCase";
import { DeleteCategoryUseCase } from "../../../application/use-cases/categories/DeleteCategoryUseCase";
import { GetCategoryUseCase } from "../../../application/use-cases/categories/GetCategoriesUseCase";
import { CreateCategoriesRoute } from "../../../infra/api/routes/categories/CreateCategoriesExpress";
import { DeleteCategoriesRoute } from "../../../infra/api/routes/categories/DeleteCategoryExpress";
import { GetCategoriesRoute } from "../../../infra/api/routes/categories/GetCategoriesExpress";
import { prisma } from "../../../infra/config/prisma/prisma";
import { CategoriesRepositoryPrisma } from "../../../infra/repositories/categories/CategoriesRepositorPrisma";

const categoryRepository = CategoriesRepositoryPrisma.build(prisma);

const getCategoriesUseCase = GetCategoryUseCase.create(categoryRepository);
const createCategoriesUseCase = CreateCategoryUseCase.create(categoryRepository);
const deleteCategoriesUseCase = DeleteCategoryUseCase.create(categoryRepository);

export const categoriesRoutes = [
  CreateCategoriesRoute.create(createCategoriesUseCase),
  GetCategoriesRoute.create(getCategoriesUseCase),
  DeleteCategoriesRoute.create(deleteCategoriesUseCase)
];