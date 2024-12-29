"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserPresenter = void 0;
class FindUserPresenter {
    user(user) {
        return {
            id: user.id,
            username: user.username,
            password: user.password
        };
    }
}
exports.FindUserPresenter = FindUserPresenter;
