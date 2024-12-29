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
exports.DeleteBankAccountUseCase = void 0;
class DeleteBankAccountUseCase {
    //private expensePresenter: ExpensePresenter
    constructor(bankAccountGateway) {
        this.bankAccountGateway = bankAccountGateway;
        //this.expensePresenter = new ExpensePresenter    
    }
    static create(bankAccountGateway) {
        return new DeleteBankAccountUseCase(bankAccountGateway);
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.bankAccountGateway.delete({ customerId: input.customerId, id: input.id });
        });
    }
}
exports.DeleteBankAccountUseCase = DeleteBankAccountUseCase;
