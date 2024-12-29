"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiExpress_1 = require("./interfaces/routes/ApiExpress");
const mainRoutes_1 = require("./interfaces/routes/mainRoutes");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const api = ApiExpress_1.ApiExpress.create(mainRoutes_1.mainRoutes);
const port = process.env.PORT || 3001;
api.start(Number(port));
