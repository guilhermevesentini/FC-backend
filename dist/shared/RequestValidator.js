"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
function validate(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error)
            return res.status(400).send({ error: error.details });
        next();
    };
}
