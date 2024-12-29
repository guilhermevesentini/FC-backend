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
exports.CreateIncomeUseCase = void 0;
const enums_1 = require("../../../@types/enums");
const income_1 = require("../../../domain/entities/income/income");
const IncomeCreateinstallmentsStrategy_1 = require("../../../domain/factories/income/create/strategies/IncomeCreateinstallmentsStrategy");
const IncomeCreateMonthStrategy_1 = require("../../../domain/factories/income/create/strategies/IncomeCreateMonthStrategy");
const IncomeCreateRecurringMonthsStratregy_1 = require("../../../domain/factories/income/create/strategies/IncomeCreateRecurringMonthsStratregy");
class CreateIncomeUseCase {
    constructor(incomeGateway) {
        this.incomeGateway = incomeGateway;
        this.createRecurring = new IncomeCreateRecurringMonthsStratregy_1.IncomeCreateRecurringMonthsStratregy(),
            this.createMonth = new IncomeCreateMonthStrategy_1.IncomeCreateMonthStrategy(),
            this.createInstallments = new IncomeCreateinstallmentsStrategy_1.IncomeCreateInstallmentsStratregy();
    }
    static create(incomeGateway) {
        return new CreateIncomeUseCase(incomeGateway);
    }
    execute(income) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            let strategy;
            let months;
            if (income.tipoLancamento == enums_1.ETipoOptions.recorrente) { //tratar aqui a seleção de range
                months = this.createRecurring.create(income);
            }
            else if (income.tipoLancamento == enums_1.ETipoOptions.parcelado) {
                months = this.createInstallments.create(income);
            }
            else {
                months = [this.createMonth.create(income)];
            }
            strategy = {
                id: income.id,
                recebimento: income.recebimento,
                replicar: income.replicar,
                tipoLancamento: income.tipoLancamento,
                range: {
                    inicio: ((_a = income.range) === null || _a === void 0 ? void 0 : _a.inicio) || undefined,
                    fim: ((_b = income.range) === null || _b === void 0 ? void 0 : _b.fim) || undefined
                },
                nome: income.nome,
                customerId: income.customerId,
                meses: months
            };
            const incomeOutput = income_1.Income.create(strategy);
            yield this.incomeGateway.create(incomeOutput);
            return incomeOutput;
        });
    }
}
exports.CreateIncomeUseCase = CreateIncomeUseCase;
