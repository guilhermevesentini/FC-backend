"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiExpress = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const envFile = process.env.NODE_ENV === "production" ? ".env" : ".env.development";
dotenv_1.default.config({ path: envFile });
class ApiExpress {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        const urls = process.env.FRONTEND_URL || "https://fc-control.netlify.app";
        this.app.use((0, cors_1.default)({
            origin: urls,
            credentials: true,
        }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((req, res, next) => {
            next();
        });
        this.addRoutes(routes);
    }
    static create(routes) {
        return new ApiExpress(routes);
    }
    addRoutes(routes) {
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();
            this.app[method](path, ...handler);
        });
    }
    start(port) {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            this.listRoutes();
        });
    }
    listRoutes() {
        const routes = this.app._router.stack
            .filter((layer) => layer.route)
            .map((layer) => {
            const route = layer.route;
            return {
                path: route.path,
                method: route.stack[0].method,
            };
        });
        const uniqueRoutes = Array.from(new Map(routes.map((r) => [`${r.method}:${r.path}`, r])).values());
        console.log(uniqueRoutes);
    }
}
exports.ApiExpress = ApiExpress;
