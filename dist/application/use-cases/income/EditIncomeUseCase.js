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
exports.EditIncomeUseCase = void 0;
const income_1 = require("../../../domain/entities/income/income");
class EditIncomeUseCase {
    constructor(incomeGateway) {
        this.incomeGateway = incomeGateway;
    }
    static create(incomeGateway) {
        return new EditIncomeUseCase(incomeGateway);
    }
    execute(input, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (input.replicar) { //ainda nao foi feito essa parte
                const aIncome = income_1.Income.create(input);
                //await this.incomeGateway.editAll(input, customerId!);  
                return this.presentOutput(aIncome);
            }
            else {
                const incomeSingle = income_1.Income.create(input);
                yield this.incomeGateway.edit(input);
                return this.presentOutput(incomeSingle);
            }
        });
    }
    presentOutput(income) {
        var _a, _b;
        return {
            id: income.id,
            customerId: income.customerId,
            recebimento: income.recebimento,
            tipoLancamento: income.tipoLancamento,
            range: {
                inicio: (_a = income.range) === null || _a === void 0 ? void 0 : _a.inicio,
                fim: (_b = income.range) === null || _b === void 0 ? void 0 : _b.fim
            },
            nome: income.nome,
            replicar: income.replicar,
            meses: income.meses,
        };
    }
}
exports.EditIncomeUseCase = EditIncomeUseCase;
