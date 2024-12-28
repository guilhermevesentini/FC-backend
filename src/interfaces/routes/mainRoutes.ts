
import { bankAccountRoutes } from "./expenses/BankAccount/BankAccountRouters";
import { externalRoutes } from "./expenses/BrazilianBankList";
import { expenseRoutes } from "./expenses/ExpensesRoutes";
import { overviewDonutRoutes } from "./expenses/overview/ExpenseDonutRouters";
import { overviewSparksRoutes } from "./expenses/overview/ExpenseSparkRouters";
import { incomeRoutes } from "./income/IncomeRoutes";
import { loginRoutes } from "./login/LoginRoutes";
import { userRoutes } from "./user/UserRouter";


export const mainRoutes = [
    ...userRoutes,
    ...loginRoutes,
    ...expenseRoutes,
    ...overviewSparksRoutes,
    ...overviewDonutRoutes,
    ...bankAccountRoutes,
    ...externalRoutes,
    ...incomeRoutes
]
