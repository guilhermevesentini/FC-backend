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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditIncomeRoute = void 0;
const route_1 = require("../../../../interfaces/routes/route");
const ResponseHandlers_1 = require("../../../../interfaces/controllers/ResponseHandlers");
class EditIncomeRoute {
    constructor(path, method, editIncomeUseCase) {
        this.path = path;
        this.method = method;
        this.editIncomeUseCase = editIncomeUseCase;
    }
    static create(editIncomeUseCase) {
        return new EditIncomeRoute("/edit-income", route_1.HttpMethod.POST, editIncomeUseCase);
    }
    getHandler() {
        return [
            (request, response) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    const incomeData = __rest(request.body, []);
                    const customerId = (_a = request.headers['x-customer-id']) === null || _a === void 0 ? void 0 : _a.toString();
                    if (!customerId) {
                        throw Error('Erro ao obter o customerId');
                    }
                    const output = yield this.editIncomeUseCase.execute(Object.assign(Object.assign({}, incomeData), { customerId }));
                    const responseBody = this.present(output);
                    ResponseHandlers_1.ResponseHandler.success(response, responseBody);
                }
                catch (error) {
                    ResponseHandlers_1.ResponseHandler.internalError(response, error);
                }
            }),
        ];
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.method;
    }
    present(expense) {
        var _a, _b;
        const output = {
            id: expense.id,
            customerId: expense.customerId,
            recebimento: expense.recebimento,
            tipoLancamento: expense.tipoLancamento,
            range: {
                inicio: (_a = expense.range) === null || _a === void 0 ? void 0 : _a.inicio,
                fim: (_b = expense.range) === null || _b === void 0 ? void 0 : _b.fim
            },
            nome: expense.nome,
            replicar: expense.replicar,
            meses: expense.meses
        };
        return output;
    }
}
exports.EditIncomeRoute = EditIncomeRoute;
