"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRoutes = void 0;
const CategoriesRoutes_1 = require("./categories/CategoriesRoutes");
const BankAccountRouters_1 = require("./expenses/BankAccount/BankAccountRouters");
const BrazilianBankList_1 = require("./expenses/BrazilianBankList");
const ExpensesRoutes_1 = require("./expenses/ExpensesRoutes");
const OverviewRouter_1 = require("./expenses/overview/OverviewRouter");
const IncomeRoutes_1 = require("./income/IncomeRoutes");
const LoginRoutes_1 = require("./login/LoginRoutes");
const UserRouter_1 = require("./user/UserRouter");
exports.mainRoutes = [
    ...UserRouter_1.userRoutes,
    ...LoginRoutes_1.loginRoutes,
    ...ExpensesRoutes_1.expenseRoutes,
    ...OverviewRouter_1.overviewRoutes,
    ...BankAccountRouters_1.bankAccountRoutes,
    ...BrazilianBankList_1.externalRoutes,
    ...IncomeRoutes_1.incomeRoutes,
    ...CategoriesRoutes_1.categoriesRoutes
];
