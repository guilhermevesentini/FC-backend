"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
const ResponseHandlers_1 = require("../interfaces/controllers/ResponseHandlers");
function validate(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error)
            return ResponseHandlers_1.ResponseHandler.error(res, error.details);
        next();
    };
}
