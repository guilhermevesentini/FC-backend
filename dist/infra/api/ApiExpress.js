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
dotenv_1.default.config();
class ApiExpress {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        console.log(process.env.FRONTEND_URL, process.env.FRONTEND_DEV_URL);
        this.app.use((0, cors_1.default)({
            origin: process.env.FRONTEND_URL || process.env.FRONTEND_DEV_URL || "http://localhost:5174", // Verifique se isso está correto
            credentials: true, // Permite cookies e cabeçalhos de autorização
        }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((req, res, next) => {
            console.log("Cookies recebidos:", req.cookies);
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
            this.app[method](path, handler);
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
