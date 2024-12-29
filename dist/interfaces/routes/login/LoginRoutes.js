"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoutes = void 0;
const LoginUseCase_1 = require("../../../application/use-cases/login/LoginUseCase");
const LoginExpress_1 = require("../../../infra/api/routes/login/LoginExpress");
const prisma_1 = require("../../../infra/config/prisma/prisma");
const LoginRespositoryPrisma_1 = require("../../../infra/repositories/login/LoginRespositoryPrisma");
//login
const loginRepository = LoginRespositoryPrisma_1.LoginRepositoryPrisma.create(prisma_1.prisma);
const loginUsecase = LoginUseCase_1.LoginUserUseCase.create(loginRepository);
exports.loginRoutes = [
    LoginExpress_1.LoginRoute.create(loginUsecase)
];
