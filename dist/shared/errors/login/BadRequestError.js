"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const httpErrorsResponses_1 = require("../httpErrorsResponses");
class BadRequestError extends httpErrorsResponses_1.HttpError {
    constructor(message = 'Requisição inválida!') {
        super(message, 400, 'BadRequestError');
    }
}
exports.BadRequestError = BadRequestError;
