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
exports.CreateUserRoute = void 0;
const route_1 = require("../../../../interfaces/routes/route");
const ResponseHandlers_1 = require("../../../../interfaces/controllers/ResponseHandlers");
class CreateUserRoute {
    constructor(path, method, createUserService) {
        this.path = path;
        this.method = method;
        this.createUserService = createUserService;
    }
    static create(createUserService) {
        return new CreateUserRoute("/create-user", route_1.HttpMethod.POST, createUserService);
    }
    getHandler() {
        return [
            (request, response) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { username, email, password } = request.body;
                    const input = {
                        email,
                        username,
                        password,
                    };
                    const output = yield this.createUserService.execute(input);
                    const responseBody = this.present(output);
                    ResponseHandlers_1.ResponseHandler.success(response, true);
                }
                catch (error) {
                    console.error("Error in CreateUserRoute:", error);
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
    present(input) {
        const response = { id: input.id };
        return response;
    }
}
exports.CreateUserRoute = CreateUserRoute;
