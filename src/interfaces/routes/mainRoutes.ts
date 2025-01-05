
import { categoriesRoutes } from "./categories/CategoriesRoutes";
import { bankAccountRoutes } from "./expenses/BankAccount/BankAccountRouters";
import { externalRoutes } from "./expenses/BrazilianBankList";
import { expenseRoutes } from "./expenses/ExpensesRoutes";
import { overviewRoutes } from "./expenses/overview/OverviewRouter";
import { incomeRoutes } from "./income/IncomeRoutes";
import { loginRoutes } from "./login/LoginRoutes";
import { userRoutes } from "./user/UserRouter";


export const mainRoutes = [
    ...userRoutes,
    ...loginRoutes,
    ...expenseRoutes,
    ...overviewRoutes,
    ...bankAccountRoutes,
    ...externalRoutes,
    ...incomeRoutes,
    ...categoriesRoutes
]
