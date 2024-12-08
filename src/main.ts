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
import { CreateExpenseMonthUseCase } from "./useCases/expenses/create/CreateExpenseMonthUseCase";
import { CreateExpenseMonthRoute } from "./infra/api/express/routes/expenses/CreateExpenseMonthExpress";
import { GetExpensePerMonthCase } from "./useCases/expenses/get/GetExpensePerMonthUseCase";
import { GetExpensePerMonthRoute } from "./infra/api/express/routes/expenses/GetExpensesEmpress";
import { DeleteExpenseUseCase } from "./useCases/expenses/delete/DeleteExpenseUseCase";
import { DeleteExpenseRoute } from "./infra/api/express/routes/expenses/DeleteExpenseExpress";
import { EditExpenseUseCase } from "./useCases/expenses/edit/EditExpenseUseCase";
import { EditExpenseRoute } from "./infra/api/express/routes/expenses/EditExpenseExpress";

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

const ExpenseRepository = ExpenseRepositoryPrisma.build(prisma);

//create
const createExpenseMonthUsecase = CreateExpenseMonthUseCase.create(ExpenseRepository);      
const createExpenseMonthRoute = CreateExpenseMonthRoute.create(createExpenseMonthUsecase);

//get
const getExpenseMonthUsecase = GetExpenseMonthUseCase.create(ExpenseRepository);      
const getExpenseMonthRoute = GetExpenseMonthRoute.create(getExpenseMonthUsecase);

//get expense per month
const getExpensePerMonthUsecase = GetExpensePerMonthCase.create(ExpenseRepository);      
const getExpensePerMonthRoute = GetExpensePerMonthRoute.create(getExpensePerMonthUsecase);

//Expense

const CreateExpenseUsecase = CreateExpenseUseCase.create(ExpenseRepository);      
const createExpenseRoute = CreateExpenseRoute.create(CreateExpenseUsecase, createExpenseMonthUsecase);

//delete
const DeleteExpenseUsecase = DeleteExpenseUseCase.create(ExpenseRepository);      
const deleteExpenseRoute = DeleteExpenseRoute.create(DeleteExpenseUsecase);

const EditExpenseUsecase = EditExpenseUseCase.create(ExpenseRepository);      
const editExpenseRoute = EditExpenseRoute.create(EditExpenseUsecase);

const api = ApiExpress.create([
    loginRoute,
    createUserRoute, listUserRoute, findUserRoute,
    createExpenseRoute, 
    getExpenseMonthRoute, createExpenseMonthRoute,
    getExpensePerMonthRoute,
    deleteExpenseRoute,
    editExpenseRoute
]);

const port = process.env.PORT || 3001;

api.start(Number(port));