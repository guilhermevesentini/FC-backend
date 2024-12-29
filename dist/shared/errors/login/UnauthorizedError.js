"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const httpErrorsResponses_1 = require("../httpErrorsResponses");
class UnauthorizedError extends httpErrorsResponses_1.HttpError {
    constructor() {
        super('Acesso não autorizado!', 403, 'UnauthorizedError');
    }
}
exports.UnauthorizedError = UnauthorizedError;
