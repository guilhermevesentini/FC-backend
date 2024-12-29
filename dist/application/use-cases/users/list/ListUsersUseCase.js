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
exports.ListUserUseCase = void 0;
const ListUserPresenter_1 = require("../../../../interfaces/presenters/users/ListUserPresenter");
class ListUserUseCase {
    constructor(userGateway) {
        this.userGateway = userGateway;
        this.listUserPresenter = new ListUserPresenter_1.ListUserPresenter;
    }
    static create(userGateway) {
        return new ListUserUseCase(userGateway);
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const aUser = yield this.userGateway.list();
            const output = this.listUserPresenter.list(aUser);
            return output;
        });
    }
}
exports.ListUserUseCase = ListUserUseCase;
