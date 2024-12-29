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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../../infra/config/prisma/prisma");
function hashPasswords() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield prisma_1.prisma.user.findMany(); // Busca todos os usuários no banco
            for (const user of users) {
                // Gera o hash para cada senha de usuário
                const hashedPassword = yield bcryptjs_1.default.hash(user.password, 10);
                // Atualiza a senha do usuário no banco
                yield prisma_1.prisma.user.update({
                    where: { id: user.id },
                    data: { password: hashedPassword },
                });
            }
            console.log("Senhas atualizadas com sucesso!");
        }
        catch (error) {
            console.error("Erro ao atualizar as senhas:", error);
        }
        finally {
            yield prisma_1.prisma.$disconnect(); // Desconecta do banco após a execução
        }
    });
}
hashPasswords();
