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
exports.ListUserRoute = void 0;
const route_1 = require("../../../../interfaces/routes/route");
const ListUserPresenter_1 = require("../../../../interfaces/presenters/users/ListUserPresenter");
const ResponseHandlers_1 = require("../../../../interfaces/controllers/ResponseHandlers");
class ListUserRoute {
    constructor(path, method, listUserService, authMiddleware) {
        this.path = path;
        this.method = method;
        this.listUserService = listUserService;
        this.authMiddleware = authMiddleware;
        this.listUserPresenter = new ListUserPresenter_1.ListUserPresenter;
    }
    static create(listUserService, authMiddleware) {
        return new ListUserRoute("/list-users", route_1.HttpMethod.GET, listUserService, authMiddleware);
    }
    getHandler() {
        return [
            this.authMiddleware.handle.bind(this.authMiddleware),
            (request, response) => __awaiter(this, void 0, void 0, function* () {
                const output = yield this.listUserService.execute();
                const responseBody = this.listUserPresenter.list(output);
                ResponseHandlers_1.ResponseHandler.success(response, responseBody);
            })
        ];
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.method;
    }
}
exports.ListUserRoute = ListUserRoute;
