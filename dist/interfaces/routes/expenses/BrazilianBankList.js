"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.externalRoutes = void 0;
const BrazilianBanksList_1 = require("../../../infra/api/routes/expenses/BrazilianBanksList");
exports.externalRoutes = [
    BrazilianBanksList_1.BankListRoute.create()
];
