"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = void 0;
const httpErrorsResponses_1 = require("../httpErrorsResponses");
class UserNotFoundError extends httpErrorsResponses_1.HttpError {
    constructor() {
        super('Usuário não encontrado!', 404, 'UserNotFoundError');
    }
}
exports.UserNotFoundError = UserNotFoundError;
