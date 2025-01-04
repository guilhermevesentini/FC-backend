"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserPresenter = void 0;
class CreateUserPresenter {
    list(user) {
        return {
            id: user.id,
            email: user.email,
            username: user.username
        };
    }
}
exports.CreateUserPresenter = CreateUserPresenter;
