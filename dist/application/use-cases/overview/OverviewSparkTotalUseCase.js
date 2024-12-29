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
exports.OverviewSparkTotalUseCase = void 0;
class OverviewSparkTotalUseCase {
    //private loginPresenter: LoginPresenter
    constructor(overviewGateway) {
        this.overviewGateway = overviewGateway;
        //this.loginPresenter = new LoginPresenter
    }
    static create(overviewGateway) {
        return new OverviewSparkTotalUseCase(overviewGateway);
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const totalFromDB = yield this.overviewGateway.sparkTotal(input);
            const output = {
                totalReceitas: {
                    value: totalFromDB.totalReceitas.value,
                    values: totalFromDB.totalReceitas.values
                },
                totalDespesas: {
                    value: totalFromDB.totalDespesas.value,
                    values: totalFromDB.totalDespesas.values
                },
                pendente: {
                    value: totalFromDB.pendente.value,
                    values: totalFromDB.pendente.values
                },
                balanco: {
                    value: totalFromDB.balanco.value,
                    values: totalFromDB.balanco.values
                }
            };
            return output;
            //return this.loginPresenter.login(output);
        });
    }
}
exports.OverviewSparkTotalUseCase = OverviewSparkTotalUseCase;
