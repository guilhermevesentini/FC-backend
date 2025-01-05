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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesRepositoryPrisma = void 0;
const enums_1 = require("../../../@types/enums");
const uuid_1 = require("uuid");
class CategoriesRepositoryPrisma {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    static build(prismaClient) {
        return new CategoriesRepositoryPrisma(prismaClient);
    }
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input.nome || !input.tipo || !input.customerId)
                throw new Error("Falta dados na categoria");
            const categoriesModel = {
                id: (0, uuid_1.v4)(),
                nome: input.nome,
                tipo: input.tipo,
                customerId: input.customerId
            };
            if (categoriesModel.tipo == enums_1.ETipoCategory.income) {
                yield this.prismaClient.incomesCategories.create({
                    data: categoriesModel
                });
            }
            if (categoriesModel.tipo == enums_1.ETipoCategory.expense) {
                yield this.prismaClient.expensesCategories.create({
                    data: categoriesModel
                });
            }
        });
    }
    get(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input.tipo || !input.customerId)
                throw new Error("Falta dados na categoria");
            let model = [];
            if (input.tipo == enums_1.ETipoCategory.income) {
                const response = yield this.prismaClient.incomesCategories.findMany({
                    where: {
                        customerId: input.customerId
                    }
                });
                if (!response)
                    throw new Error("Erro ao buscar as categorias");
                response.forEach((category) => {
                    const data = {
                        id: category.id,
                        nome: category.nome,
                        customerId: category.customerId
                    };
                    model.push(data);
                });
            }
            if (input.tipo == enums_1.ETipoCategory.expense) {
                const response = yield this.prismaClient.expensesCategories.findMany({
                    where: {
                        customerId: input.customerId
                    }
                });
                if (!response)
                    throw new Error("Erro ao buscar as categorias");
                response.forEach((category) => {
                    const data = {
                        id: category.id,
                        nome: category.nome,
                        customerId: category.customerId
                    };
                    model.push(data);
                });
            }
            return model;
        });
    }
    delete(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (input.tipo == enums_1.ETipoCategory.income) {
                yield this.prismaClient.incomesCategories.delete({
                    where: {
                        id: input.id
                    }
                });
            }
            if (input.tipo == enums_1.ETipoCategory.expense) {
                yield this.prismaClient.expensesCategories.delete({
                    where: {
                        id: input.id
                    }
                });
            }
        });
    }
}
exports.CategoriesRepositoryPrisma = CategoriesRepositoryPrisma;
