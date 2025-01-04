"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryPrisma = void 0;
const user_1 = require("../../../domain/entities/users/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserRepositoryPrisma {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    static create(prismaClient) {
        return new UserRepositoryPrisma(prismaClient);
    }
    //modelar para o banco
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const generateId = yield bcryptjs_1.default.hash(user.password, 10);
            const data = {
                id: user.id,
                username: user.username,
                email: user.email,
                password: generateId
            };
            yield this.prismaClient.user.create({
                data
            });
        });
    }
    //modelar do banco para o sistema
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.prismaClient.user.findMany();
            const userList = users.map((u) => {
                const user = user_1.User.with({
                    id: u.id,
                    email: u.email,
                    username: u.username,
                    password: u.password
                });
                return user;
            });
            return userList;
        });
    }
    findUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield this.prismaClient.user.findUnique({
                where: { email }
            });
            if (!userData)
                return;
            const user = user_1.User.with({
                id: userData === null || userData === void 0 ? void 0 : userData.id,
                email: userData.email,
                password: userData === null || userData === void 0 ? void 0 : userData.password,
                username: userData === null || userData === void 0 ? void 0 : userData.username
            });
            return user;
        });
    }
}
exports.UserRepositoryPrisma = UserRepositoryPrisma;
