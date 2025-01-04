import { ChangePasswordUseCase } from "../../../application/use-cases/users/ChangePasswordUseCase";
import { CreateUserUseCase } from "../../../application/use-cases/users/CreateUserUseCase";
import { FindUserUseCase } from "../../../application/use-cases/users/FindUserUseCase";
import { ListUserUseCase } from "../../../application/use-cases/users/ListUsersUseCase";
import { RecoverPasswordUseCase } from "../../../application/use-cases/users/RecoverPasswordUseCase";
import { AuthMiddleware } from "../../../infra/api/auth/AuthMiddleware";
import { ChangePasswordUserRoute } from "../../../infra/api/routes/user/ChangePasswordExpress";
import { CreateUserRoute } from "../../../infra/api/routes/user/CreateUserExpress";
import { FindUserRoute } from "../../../infra/api/routes/user/FindUserExpress";
import { ListUserRoute } from "../../../infra/api/routes/user/ListUserExpress";
import { RecoverPasswordUserRoute } from "../../../infra/api/routes/user/RecoverPasswordUserExpress";
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
const recoverPasswordUsecase = RecoverPasswordUseCase.create(userRepository);
const chnagePasswordUsecase = ChangePasswordUseCase.create(userRepository);

export const userRoutes = [
    CreateUserRoute.create(createUserUsecase),
    ListUserRoute.create(listUserUsecase, authMiddleware),
    FindUserRoute.create(findUserUsecase),
    RecoverPasswordUserRoute.create(recoverPasswordUsecase),
    ChangePasswordUserRoute.create(chnagePasswordUsecase),
];