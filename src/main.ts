import dotenv from "dotenv";
dotenv.config();
import { prisma } from "./config/prisma/prisma";
import { ApiExpress } from "./infra/api/express/ApiExpress";
import { UserRepositoryPrisma } from "./infra/repositories/user/UserRespositoryPrisma";
import { ListUserUseCase } from "./useCases/user/list/ListUsersUseCase";
import { CreateUserRoute } from "./infra/api/express/routes/user/CreateUserExpress";
import { ListUserRoute } from "./infra/api/express/routes/user/ListUserExpress";
import { FindUserRoute } from "./infra/api/express/routes/user/FindUserExpress";
import { CreateUserUseCase } from "./useCases/user/create/CreateUserUseCase";
import { FindUserUseCase } from "./useCases/user/find/FindUserUseCase";
import { AuthMiddleware } from "./infra/auth/AuthMiddleware";
import { LoginUserUseCase } from "./useCases/login/LoginUseCase";
import { LoginRepositoryPrisma } from "./infra/repositories/login/LoginRespositoryPrisma";
import { LoginRoute } from "./infra/api/express/routes/login/LoginExpress";
import { ExpenseRepositoryPrisma } from "./infra/repositories/expense/ExpenseRepositoryPrisma";
import { CreateExpenseUseCase } from "./useCases/expenses/create/CreateExpenseUseCase";
import { CreateExpenseRoute } from "./infra/api/express/routes/expenses/CreateExpenseExpress";
import { GetExpenseMonthUseCase } from "./useCases/expenses/get/GetExpensesMonthUseCase";
import { GetExpenseMonthRoute } from "./infra/api/express/routes/expenses/GetExpensePerMonthExpress";
import { ExpenseMonthRepositoryPrisma } from "./infra/repositories/expense/ExpenseMonthRepositoryPrisma";
import { CreateExpenseMonthUseCase } from "./useCases/expenses/create/CreateExpenseMonthUseCase";
import { CreateExpenseMonthRoute } from "./infra/api/express/routes/expenses/CreateExpenseMonthExpress";
import { GetExpensePerMonthRepositoryPrisma } from "./infra/repositories/expense/GetExpensePerMonthRepositoryPrisma";
import { GetExpensePerMonthCase } from "./useCases/expenses/get/GetExpensePerMonthUseCase";
import { GetExpensePerMonthRoute } from "./infra/api/express/routes/expenses/GetExpensesEmpress";

//auth
const authMiddleware = new AuthMiddleware(process.env.SECRET_KEY || 'mysecretkeyfcbackend');

//user
const userRepository = UserRepositoryPrisma.create(prisma);

const createUserUsecase = CreateUserUseCase.create(userRepository);
const listUserUsecase = ListUserUseCase.create(userRepository);
const findUserUsecase = FindUserUseCase.create(userRepository);

const createUserRoute = CreateUserRoute.create(createUserUsecase);
const listUserRoute = ListUserRoute.create(listUserUsecase, authMiddleware);
const findUserRoute = FindUserRoute.create(findUserUsecase);

//login
const loginRepository = LoginRepositoryPrisma.create(prisma);

const loginUsecase = LoginUserUseCase.create(loginRepository);  
    
const loginRoute = LoginRoute.create(loginUsecase);

//Expense Month

//create
const CreateExpenseMonthRepository = ExpenseMonthRepositoryPrisma.build(prisma);
const createExpenseMonthUsecase = CreateExpenseMonthUseCase.create(CreateExpenseMonthRepository);      
const createExpenseMonthRoute = CreateExpenseMonthRoute.create(createExpenseMonthUsecase);

//get
const GetExpenseMonthRepository = ExpenseMonthRepositoryPrisma.build(prisma);
const getExpenseMonthUsecase = GetExpenseMonthUseCase.create(GetExpenseMonthRepository);      
const getExpenseMonthRoute = GetExpenseMonthRoute.create(getExpenseMonthUsecase);

//get expense per month
const GetExpensePerMonthRepository = GetExpensePerMonthRepositoryPrisma.build(prisma);
const getExpensePerMonthUsecase = GetExpensePerMonthCase.create(GetExpensePerMonthRepository);      
const getExpensePerMonthRoute = GetExpensePerMonthRoute.create(getExpensePerMonthUsecase);

//Expense
const CreateExpenseRepository = ExpenseRepositoryPrisma.build(prisma);
const CreateExpenseUsecase = CreateExpenseUseCase.create(CreateExpenseRepository);      
const createExpenseRoute = CreateExpenseRoute.create(CreateExpenseUsecase, createExpenseMonthUsecase);




const api = ApiExpress.create([
    loginRoute,
    createUserRoute, listUserRoute, findUserRoute,
    createExpenseRoute, 
    getExpenseMonthRoute, createExpenseMonthRoute,
    getExpensePerMonthRoute
]);

const port = process.env.PORT || 3001;

api.start(Number(port));