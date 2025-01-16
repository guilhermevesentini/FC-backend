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
exports.OverviewSparksRepositoryPrisma = void 0;
class OverviewSparksRepositoryPrisma {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    static build(prismaClient) {
        return new OverviewSparksRepositoryPrisma(prismaClient);
    }
    sparkTotal(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input.customerId || !input.inicio || !input.fim) {
                throw new Error('Parâmetros inválidos: customerId, inicio ou fim ausentes');
            }
            const startDate = new Date(input.inicio);
            const endDate = new Date(input.fim);
            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                throw new Error('Datas de início ou fim inválidas');
            }
            const ano = endDate.getFullYear();
            const buildFilter = (additionalFilters = {}) => (Object.assign({ customerId: input.customerId, ano: ano }, additionalFilters));
            try {
                const fetchData = (model, where) => __awaiter(this, void 0, void 0, function* () {
                    const result = yield model.findMany({ where });
                    if (!Array.isArray(result)) {
                        throw new Error('O retorno do banco de dados não é um array');
                    }
                    return result;
                });
                const [incomes, expenses, expensesPending] = yield Promise.all([
                    fetchData(this.prismaClient.incomeMonths, buildFilter({ recebimento: { gte: startDate, lte: endDate } })),
                    fetchData(this.prismaClient.expensesMonths, buildFilter({ vencimento: { gte: startDate, lte: endDate } })),
                    fetchData(this.prismaClient.expensesMonths, buildFilter({ vencimento: { gte: startDate, lte: endDate }, status: 2 }))
                ]);
                const calculateTotal = (items) => (items === null || items === void 0 ? void 0 : items.reduce((sum, item) => sum + (item.valor || 0), 0)) || 0;
                const padValues = (values, minLength) => {
                    while (values.length < minLength) {
                        values.push(0);
                    }
                    return values;
                };
                const getValuesWithPadding = (val) => {
                    const values = val.map(item => item.valor || 0);
                    return padValues(values, 5);
                };
                const distributeBalance = (incomes, expenses) => {
                    let valores = [];
                    let remainingIncome = calculateTotal(incomes);
                    for (let i = 0; i < expenses.length; i++) {
                        if (remainingIncome > 0) {
                            const difference = remainingIncome - (expenses[i].valor || 0);
                            valores.push(difference);
                            remainingIncome = difference;
                        }
                        else {
                            valores.push(0);
                        }
                    }
                    return padValues(valores, 5);
                };
                const result = {
                    totalReceitas: {
                        value: calculateTotal(incomes),
                        values: getValuesWithPadding(incomes)
                    },
                    totalDespesas: {
                        value: calculateTotal(expenses),
                        values: getValuesWithPadding(expenses)
                    },
                    pendente: {
                        value: calculateTotal(expensesPending),
                        values: getValuesWithPadding(expensesPending)
                    },
                    balanco: {
                        value: calculateTotal(incomes) - calculateTotal(expenses),
                        values: distributeBalance(incomes, expenses)
                    },
                };
                return result;
            }
            catch (err) {
                console.error('Erro ao processar os dados do spark', err);
                throw new Error('Erro ao calcular os dados do spark');
            }
        });
    }
    donutTotal(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input.customerId || !input.inicio || !input.fim) {
                throw new Error('Parâmetros inválidos: customerId, inicio ou fim ausentes');
            }
            const expenses = yield this.prismaClient.expensesMonths.findMany({
                where: {
                    customerId: input.customerId,
                    vencimento: { gte: new Date(input.inicio), lte: new Date(input.fim) },
                },
            });
            if (!expenses.length)
                return { labels: [], values: [] };
            const groupedExpenses = expenses.reduce((acc, { categoria = "Outros", valor = 0 }) => {
                acc[categoria] = (acc[categoria] || 0) + valor;
                return acc;
            }, {});
            // Ordenar os dados com base nos valores em ordem decrescente
            const sortedEntries = Object.entries(groupedExpenses).sort(([, a], [, b]) => b - a);
            return {
                labels: sortedEntries.map(([categoria]) => categoria),
                values: sortedEntries.map(([, valor]) => valor),
            };
        });
    }
    movimentos(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentMonth = new Date().getMonth() + 1;
            const monthsArray = Array.from({ length: 12 }, (_, index) => index + 1);
            const currentYear = input.ano;
            const [expensesMonths, incomesMonths] = yield Promise.all([
                this.prismaClient.expensesMonths.findMany({
                    where: {
                        customerId: input.customerId,
                        ano: currentYear,
                        mes: {
                            gte: 1, lte: 12
                        }
                    },
                }),
                this.prismaClient.incomeMonths.findMany({
                    where: {
                        customerId: input.customerId,
                        ano: currentYear,
                        mes: {
                            gte: 1, lte: 12
                        }
                    },
                }),
            ]);
            if (!expensesMonths.length || !incomesMonths.length)
                return { receitas: [], balanco: [], despesas: [] };
            const expensesMap = expensesMonths.reduce((acc, { mes, valor }) => {
                acc[mes] = (acc[mes] || 0) + valor;
                return acc;
            }, {});
            const incomesMap = incomesMonths.reduce((acc, { mes, valor }) => {
                acc[mes] = (acc[mes] || 0) + valor;
                return acc;
            }, {});
            const despesas = monthsArray.map((mes) => expensesMap[mes] || 0);
            const receitas = monthsArray.map((mes) => incomesMap[mes] || 0);
            const balanco = monthsArray.map((_, index) => receitas[index] - despesas[index]);
            return { receitas, balanco, despesas };
        });
    }
}
exports.OverviewSparksRepositoryPrisma = OverviewSparksRepositoryPrisma;
