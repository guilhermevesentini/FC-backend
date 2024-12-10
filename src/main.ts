import dotenv from "dotenv";
dotenv.config();
import { prisma } from "./infra/config/prisma/prisma";
import { ApiExpress } from "./infra/api/express/ApiExpress";
import { UserRepositoryPrisma } from "./infra/repositories/user/UserRespositoryPrisma";
import { CreateUserRoute } from "./infra/api/express/routes/user/CreateUserExpress";
import { ListUserRoute } from "./infra/api/express/routes/user/ListUserExpress";
import { FindUserRoute } from "./infra/api/express/routes/user/FindUserExpress";
import { AuthMiddleware } from "./infra/api/auth/AuthMiddleware";
import { LoginRepositoryPrisma } from "./infra/repositories/login/LoginRespositoryPrisma";
import { LoginRoute } from "./infra/api/express/routes/login/LoginExpress";
import { ExpenseRepositoryPrisma } from "./infra/repositories/expense/ExpenseRepositoryPrisma";
import { CreateExpenseRoute } from "./infra/api/express/routes/expenses/CreateExpenseExpress";
import { GetExpenseMonthRoute } from "./infra/api/express/routes/expenses/GetExpensePerMonthExpress";
import { CreateExpenseMonthRoute } from "./infra/api/express/routes/expenses/CreateExpenseMonthExpress";
import { GetExpensePerMonthRoute } from "./infra/api/express/routes/expenses/GetExpensesEmpress";
import { DeleteExpenseRoute } from "./infra/api/express/routes/expenses/DeleteExpenseExpress";
import { EditExpenseRoute } from "./infra/api/express/routes/expenses/EditExpenseExpress";
import { CreateExpenseMonthUseCase } from "./application/use-cases/expenses/create/CreateExpenseMonthUseCase";
import { CreateExpenseUseCase } from "./application/use-cases/expenses/create/CreateExpenseUseCase";
import { DeleteExpenseUseCase } from "./application/use-cases/expenses/delete/DeleteExpenseUseCase";
import { EditExpenseUseCase } from "./application/use-cases/expenses/edit/EditExpenseUseCase";
import { GetExpensePerMonthCase } from "./application/use-cases/expenses/get/GetExpensePerMonthUseCase";
import { GetExpenseMonthUseCase } from "./application/use-cases/expenses/get/GetExpensesMonthUseCase";
import { LoginUserUseCase } from "./application/use-cases/login/LoginUseCase";
import { CreateUserUseCase } from "./application/use-cases/users/create/CreateUserUseCase";
import { FindUserUseCase } from "./application/use-cases/users/find/FindUserUseCase";
import { ListUserUseCase } from "./application/use-cases/users/list/ListUsersUseCase";

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