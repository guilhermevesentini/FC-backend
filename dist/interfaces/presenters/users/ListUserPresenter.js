"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUserPresenter = void 0;
class ListUserPresenter {
    list(users) {
        return users.map((u) => {
            return {
                id: u.id,
                email: u.email,
                username: u.username,
            };
        });
    }
}
exports.ListUserPresenter = ListUserPresenter;
