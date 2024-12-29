"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCredentialsError = void 0;
const httpErrorsResponses_1 = require("../httpErrorsResponses");
class InvalidCredentialsError extends httpErrorsResponses_1.HttpError {
    constructor() {
        super('Sua senha está incorreta!', 401, 'InvalidCredentialsError');
    }
}
exports.InvalidCredentialsError = InvalidCredentialsError;
