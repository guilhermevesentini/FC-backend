import { expenseRoutes } from "./expenses/expensesRoutes";
import { loginRoutes } from "./login/LoginRoutes";
import { userRoutes } from "./user/UserRouter";


export const mainRoutes = [
    ...userRoutes,
    ...loginRoutes,
    ...expenseRoutes,
];
