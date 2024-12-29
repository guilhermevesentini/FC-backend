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
exports.OverviewDonutUseCase = void 0;
class OverviewDonutUseCase {
    constructor(overviewDonutGateway) {
        this.overviewDonutGateway = overviewDonutGateway;
    }
    static create(overviewDonutGateway) {
        return new OverviewDonutUseCase(overviewDonutGateway);
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const donutFromDB = yield this.overviewDonutGateway.donutTotal(input);
            const output = {
                labels: donutFromDB.labels,
                values: donutFromDB.values
            };
            return output;
            //return this.loginPresenter.login(output);
        });
    }
}
exports.OverviewDonutUseCase = OverviewDonutUseCase;
