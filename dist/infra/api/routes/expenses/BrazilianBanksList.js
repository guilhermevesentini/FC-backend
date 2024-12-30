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
exports.BankListRoute = void 0;
const route_1 = require("../../../../interfaces/routes/route");
const BancoApiService_1 = require("../../../services/BancoApiService");
const ResponseHandlers_1 = require("../../../../interfaces/controllers/ResponseHandlers");
class BankListRoute {
    constructor(path, method) {
        this.path = path;
        this.method = method;
    }
    static create() {
        return new BankListRoute("/get-banks/", route_1.HttpMethod.GET);
    }
    getHandler() {
        return [
            (request, response) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const output = yield (0, BancoApiService_1.obterListaDeBancos)();
                    ResponseHandlers_1.ResponseHandler.success(response, output);
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
}
exports.BankListRoute = BankListRoute;
