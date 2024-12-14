import { LoginUserUseCase } from "../../../application/use-cases/login/LoginUseCase";
import { LoginRoute } from "../../../infra/api/routes/login/LoginExpress";
import { prisma } from "../../../infra/config/prisma/prisma";
import { LoginRepositoryPrisma } from "../../../infra/repositories/login/LoginRespositoryPrisma";

//login
const loginRepository = LoginRepositoryPrisma.create(prisma);

const loginUsecase = LoginUserUseCase.create(loginRepository);

export const loginRoutes = [
  LoginRoute.create(loginUsecase)
];