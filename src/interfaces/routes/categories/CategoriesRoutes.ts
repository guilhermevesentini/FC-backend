import { CreateCategoryUseCase } from "../../../application/use-cases/categories/CreateCategoryUseCase";
import { DeleteCategoryUseCase } from "../../../application/use-cases/categories/DeleteCategoryUseCase";
import { EditCategoryUseCase } from "../../../application/use-cases/categories/EditCategoryUseCase";
import { GetCategoryUseCase } from "../../../application/use-cases/categories/GetCategoriesUseCase";
import { CreateCategoriesRoute } from "../../../infra/api/routes/categories/CreateCategoriesExpress";
import { DeleteCategoriesRoute } from "../../../infra/api/routes/categories/DeleteCategoryExpress";
import { EditCategoriesRoute } from "../../../infra/api/routes/categories/EditCategoriesExpress";
import { GetCategoriesRoute } from "../../../infra/api/routes/categories/GetCategoriesExpress";
import { prisma } from "../../../infra/config/prisma/prisma";
import { CategoriesRepositoryPrisma } from "../../../infra/repositories/categories/CategoriesRepositorPrisma";

const categoryRepository = CategoriesRepositoryPrisma.build(prisma);

const getCategoriesUseCase = GetCategoryUseCase.create(categoryRepository);
const createCategoriesUseCase = CreateCategoryUseCase.create(categoryRepository);
const deleteCategoriesUseCase = DeleteCategoryUseCase.create(categoryRepository);
const editCategoriesUseCase = EditCategoryUseCase.create(categoryRepository);

export const categoriesRoutes = [
  CreateCategoriesRoute.create(createCategoriesUseCase),
  GetCategoriesRoute.create(getCategoriesUseCase),
  EditCategoriesRoute.create(editCategoriesUseCase),
  DeleteCategoriesRoute.create(deleteCategoriesUseCase)
];