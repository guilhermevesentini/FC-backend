"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPresenter = void 0;
class UserPresenter {
    user(user) {
        return {
            id: user.id,
            email: user.email,
            username: user.username,
        };
    }
}
exports.UserPresenter = UserPresenter;
