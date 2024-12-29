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
exports.CreateUserUseCase = void 0;
const user_1 = require("../../../../domain/entities/users/user");
const UserPresenter_1 = require("../../../../interfaces/presenters/users/UserPresenter");
class CreateUserUseCase {
    constructor(userGateway) {
        this.userGateway = userGateway;
        this.userPresenter = new UserPresenter_1.UserPresenter;
    }
    static create(userGateway) {
        return new CreateUserUseCase(userGateway);
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ username, password }) {
            const aUser = yield user_1.User.create(username, password);
            const userExists = yield this.userGateway.findUser(username);
            if (userExists)
                return this.userPresenter.user(aUser);
            yield this.userGateway.save(aUser);
            const output = this.userPresenter.user(aUser);
            return output;
        });
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
