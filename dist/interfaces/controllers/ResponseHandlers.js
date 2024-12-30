"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = exports.EStatusCode = void 0;
var EStatusCode;
(function (EStatusCode) {
    EStatusCode[EStatusCode["success"] = 200] = "success";
    EStatusCode[EStatusCode["error"] = 400] = "error";
    EStatusCode[EStatusCode["notFound"] = 404] = "notFound";
    EStatusCode[EStatusCode["unauthorized"] = 401] = "unauthorized";
    EStatusCode[EStatusCode["internalError"] = 500] = "internalError";
})(EStatusCode || (exports.EStatusCode = EStatusCode = {}));
class ResponseHandler {
    static success(res, data, message = 'Success') {
        return res.status(EStatusCode.success).json({
            statusCode: EStatusCode.success,
            result: data,
            message
        });
    }
    static error(res, message, errors = []) {
        return res.status(EStatusCode.error).json({
            statusCode: EStatusCode.error,
            result: undefined,
            message,
            errors
        });
    }
    static notFound(res, message = 'Resource not found') {
        return res.status(EStatusCode.notFound).json({
            statusCode: EStatusCode.notFound,
            result: undefined,
            message
        });
    }
    static unauthorized(res, message = 'Unauthorized') {
        return res.status(EStatusCode.unauthorized).json({
            statusCode: EStatusCode.unauthorized,
            result: undefined,
            message
        });
    }
    static internalError(res, message = 'Internal Server Error') {
        return res.status(EStatusCode.internalError).json({
            statusCode: EStatusCode.internalError,
            result: undefined,
            message
        });
    }
}
exports.ResponseHandler = ResponseHandler;
