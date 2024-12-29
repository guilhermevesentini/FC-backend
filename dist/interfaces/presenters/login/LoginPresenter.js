"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPresenter = void 0;
class LoginPresenter {
    login(user) {
        return {
            token: user.token,
            customerId: user.customerId,
        };
    }
}
exports.LoginPresenter = LoginPresenter;
