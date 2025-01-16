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
exports.OverviewResumoMovimentoUseCase = void 0;
class OverviewResumoMovimentoUseCase {
    //private loginPresenter: LoginPresenter
    constructor(overviewGateway) {
        this.overviewGateway = overviewGateway;
        //this.loginPresenter = new LoginPresenter
    }
    static create(overviewGateway) {
        return new OverviewResumoMovimentoUseCase(overviewGateway);
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const ValuesFromDB = yield this.overviewGateway.movimentos({ customerId: input.customerId, ano: input.ano });
            const output = {
                despesas: ValuesFromDB.despesas,
                balanco: ValuesFromDB.balanco,
                receitas: ValuesFromDB.receitas
            };
            return output;
            //return this.loginPresenter.login(output);
        });
    }
}
exports.OverviewResumoMovimentoUseCase = OverviewResumoMovimentoUseCase;
