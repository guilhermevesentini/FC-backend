import dotenv from "dotenv";
dotenv.config();
import { prisma } from "./infra/config/prisma/prisma";
import { ApiExpress } from "./infra/api/ApiExpress";
import { UserRepositoryPrisma } from "./infra/repositories/user/UserRespositoryPrisma";
import { CreateUserRoute } from "./infra/api/routes/user/CreateUserExpress";
import { ListUserRoute } from "./infra/api/routes/user/ListUserExpress";
import { FindUserRoute } from "./infra/api/routes/user/FindUserExpress";
import { AuthMiddleware } from "./infra/api/auth/AuthMiddleware";
import { LoginRepositoryPrisma } from "./infra/repositories/login/LoginRespositoryPrisma";
import { LoginRoute } from "./infra/api/routes/login/LoginExpress";
import { ExpenseRepositoryPrisma } from "./infra/repositories/expense/ExpenseRepositoryPrisma";
import { CreateExpenseRoute } from "./infra/api/routes/expenses/CreateExpenseExpress";
import { GetExpenseRoute } from "./infra/api/routes/expenses/GetExpensesEmpress";
import { DeleteExpenseRoute } from "./infra/api/routes/expenses/DeleteExpenseExpress";
import { EditExpenseRoute } from "./infra/api/routes/expenses/EditExpenseExpress";
import { CreateExpenseUseCase } from "./application/use-cases/expenses/create/CreateExpenseUseCase";
import { DeleteExpenseUseCase } from "./application/use-cases/expenses/delete/DeleteExpenseUseCase";
import { EditExpenseUseCase } from "./application/use-cases/expenses/edit/EditExpenseUseCase";
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

//repository
const ExpenseRepository = ExpenseRepositoryPrisma.build(prisma);
//get
const getExpenseMonthUsecase = GetExpenseMonthUseCase.create(ExpenseRepository);      
const getExpenseMonthRoute = GetExpenseRoute.create(getExpenseMonthUsecase);
//create
const CreateExpenseUsecase = CreateExpenseUseCase.create(ExpenseRepository);      
const createExpenseRoute = CreateExpenseRoute.create(CreateExpenseUsecase);
//delete
const DeleteExpenseUsecase = DeleteExpenseUseCase.create(ExpenseRepository);      
const deleteExpenseRoute = DeleteExpenseRoute.create(DeleteExpenseUsecase);
//edit
const EditExpenseUsecase = EditExpenseUseCase.create(ExpenseRepository);      
const editExpenseRoute = EditExpenseRoute.create(EditExpenseUsecase);


const api = ApiExpress.create([
    loginRoute,
    createUserRoute, listUserRoute, findUserRoute,
    createExpenseRoute, 
    getExpenseMonthRoute,
    deleteExpenseRoute,
    editExpenseRoute
]);

const port = process.env.PORT || 3001;

api.start(Number(port));