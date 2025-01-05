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
exports.CreateCategoryUseCase = void 0;
const Categories_1 = require("../../../domain/entities/categories/Categories");
class CreateCategoryUseCase {
    //private expensePresenter: ExpensePresenter
    constructor(categoriesGateway) {
        this.categoriesGateway = categoriesGateway;
        //this.expensePresenter = new ExpensePresenter    
    }
    static create(categoriesGateway) {
        return new CreateCategoryUseCase(categoriesGateway);
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const aCategory = Categories_1.Categories.create(input);
            try {
                yield this.categoriesGateway.create(aCategory);
            }
            catch (err) {
                console.log(err);
            }
            finally {
                const output = {
                    id: aCategory.id,
                    nome: aCategory.nome,
                    tipo: aCategory.tipo,
                    customerId: aCategory.customerId
                };
                return output;
            }
        });
    }
}
exports.CreateCategoryUseCase = CreateCategoryUseCase;
