"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
class HttpError extends Error {
    constructor(message, statusCode, name) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        // Preserva o stack trace original para debugging
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.HttpError = HttpError;
