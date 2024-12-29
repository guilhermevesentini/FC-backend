"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBankAccountUseCase = void 0;
const BankAccount_1 = require("../../../domain/entities/BankAccount/BankAccount");
class GetBankAccountUseCase {
    //private expensePresenter: ExpensePresenter
    constructor(bankAccountGateway) {
        this.bankAccountGateway = bankAccountGateway;
        //this.expensePresenter = new ExpensePresenter    
    }
    static create(bankAccountGateway) {
        return new GetBankAccountUseCase(bankAccountGateway);
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.bankAccountGateway.get({ customerId: input.customerId });
            const aAccount = response.map((acc) => BankAccount_1.BankAccount.create(acc));
            //const output: ExpenseDto = this.expensePresenter.expense(response)
            //const output: BankAccountOutputDto[] =  aAccount.map((acc) => )
            return aAccount;
        });
    }
}
exports.GetBankAccountUseCase = GetBankAccountUseCase;
