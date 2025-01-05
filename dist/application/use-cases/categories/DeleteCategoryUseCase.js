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
exports.DeleteCategoryUseCase = void 0;
class DeleteCategoryUseCase {
    //private expensePresenter: ExpensePresenter
    constructor(categoriesGateway) {
        this.categoriesGateway = categoriesGateway;
        //this.expensePresenter = new ExpensePresenter    
    }
    static create(categoriesGateway) {
        return new DeleteCategoryUseCase(categoriesGateway);
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = false;
            try {
                yield this.categoriesGateway.delete(input);
                response = true;
            }
            catch (err) {
                response = false;
            }
            return response;
        });
    }
}
exports.DeleteCategoryUseCase = DeleteCategoryUseCase;
