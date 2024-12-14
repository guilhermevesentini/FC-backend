import { CreateUserUseCase } from "../../../application/use-cases/users/create/CreateUserUseCase";
import { FindUserUseCase } from "../../../application/use-cases/users/find/FindUserUseCase";
import { ListUserUseCase } from "../../../application/use-cases/users/list/ListUsersUseCase";
import { AuthMiddleware } from "../../../infra/api/auth/AuthMiddleware";
import { CreateUserRoute } from "../../../infra/api/routes/user/CreateUserExpress";
import { FindUserRoute } from "../../../infra/api/routes/user/FindUserExpress";
import { ListUserRoute } from "../../../infra/api/routes/user/ListUserExpress";
import { prisma } from "../../../infra/config/prisma/prisma";
import { UserRepositoryPrisma } from "../../../infra/repositories/user/UserRespositoryPrisma";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = new AuthMiddleware(process.env.SECRET_KEY || 'mysecretkeyfcbackend');

//user
const userRepository = UserRepositoryPrisma.create(prisma);

const createUserUsecase = CreateUserUseCase.create(userRepository);
const listUserUsecase = ListUserUseCase.create(userRepository);
const findUserUsecase = FindUserUseCase.create(userRepository);

export const userRoutes = [
    CreateUserRoute.create(createUserUsecase),
    ListUserRoute.create(listUserUsecase, authMiddleware),
    FindUserRoute.create(findUserUsecase),
];