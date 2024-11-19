import { prisma } from "./package/prisma/prisma";
import { ApiExpress } from "./infra/api/express/api.express";
import { UserRepositoryPrisma } from "./infra/repositories/user/user.repository.prisma";
import { CreateUserUseCase } from "./useCases/user/create-user/create-user.usecase";
import { ListUserUseCase } from "./useCases/user/list-user/list-user.usecase";
import { CreateUserRoute } from "./infra/api/express/routes/user/create-user.express";
import { ListUserRoute } from "./infra/api/express/routes/user/list-user.express";

function main() {

    const aRepository = UserRepositoryPrisma.create(prisma);

    const createUserUsecase = CreateUserUseCase.create(aRepository);
    const listUserUsecase = ListUserUseCase.create(aRepository);

    const createRoute = CreateUserRoute.create(createUserUsecase);
    const listRoute = ListUserRoute.create(listUserUsecase);

    const api = ApiExpress.create([createRoute, listRoute]);
    const port = 8000;
    api.start(port);
}

main();
