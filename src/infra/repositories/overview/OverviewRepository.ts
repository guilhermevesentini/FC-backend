import { PrismaClient } from "@prisma/client";
import { OverviewDonuOutputDto, OverviewDonutInputDto, OverviewResumoMovimentoOutputDto, OverviewSparkTotalInputDto, OverviewSparkTotalOutputDto } from "../../../application/dtos/overviewDto";
import { OverviewGateway } from "../../gateways/overview/OverviewGateway";

export class OverviewSparksRepositoryPrisma implements OverviewGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static build(prismaClient: PrismaClient) {
    return new OverviewSparksRepositoryPrisma(prismaClient);
  }

  public async sparkTotal(input: OverviewSparkTotalInputDto): Promise<OverviewSparkTotalOutputDto> {
    if (!input.customerId || !input.inicio || !input.fim) {
      throw new Error('Parâmetros inválidos: customerId, inicio ou fim ausentes');
    }

    const startDate = new Date(input.inicio);
    const endDate = new Date(input.fim);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error('Datas de início ou fim inválidas');
    }

    const ano = endDate.getFullYear();

    const buildFilter = (additionalFilters: any = {}) => ({
      customerId: input.customerId,
      ano: ano,
      ...additionalFilters,
    });
    
    try {
      const fetchData = async (model: any, where: any) => {
        const result = await model.findMany({ where });
        if (!Array.isArray(result)) {
          throw new Error('O retorno do banco de dados não é um array');
        }
        return result;
      };

      const [incomes, expenses, expensesPending] = await Promise.all([
        fetchData(this.prismaClient.incomeMonths, buildFilter({ recebimento: { gte: startDate, lte: endDate } })),
        fetchData(this.prismaClient.expensesMonths, buildFilter({ vencimento: { gte: startDate, lte: endDate } })),
        fetchData(this.prismaClient.expensesMonths, buildFilter({ vencimento: { gte: startDate, lte: endDate }, status: 2 }))
      ]);

      const calculateTotal = (items: any[]) => items?.reduce((sum, item) => sum + (item.valor || 0), 0) || 0;

      const padValues = (values: number[], minLength: number) => {
        while (values.length < minLength) {
          values.push(0);
        }
        return values;
      };

      const getValuesWithPadding = (val: any[]) => {
        const values = val.map(item => item.valor || 0);
        return padValues(values, 5);
      };

      const distributeBalance = (incomes: any[], expenses: any[]) => {
        let valores = [];
        let remainingIncome = calculateTotal(incomes);

        for (let i = 0; i < expenses.length; i++) {
          if (remainingIncome > 0) {
            const difference = remainingIncome - (expenses[i].valor || 0);
            valores.push(difference);
            remainingIncome = difference;
          } else {
            valores.push(0);
          }
        }

        return padValues(valores, 5);
      };


      
      const result: OverviewSparkTotalOutputDto = {
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
    } catch (err) {
      console.error('Erro ao processar os dados do spark', err);
      throw new Error('Erro ao calcular os dados do spark');
    }      
  }


  public async donutTotal(input: OverviewDonutInputDto): Promise<OverviewDonuOutputDto> {
    if (!input.customerId || !input.inicio || !input.fim) {
      throw new Error('Parâmetros inválidos: customerId, inicio ou fim ausentes');
    }
    
    const expenses = await this.prismaClient.expensesMonths.findMany({
      where: {
        customerId: input.customerId,
        vencimento: { gte: new Date(input.inicio), lte: new Date(input.fim) },
      },
    });

    if (!expenses.length) return { labels: [], values: [] };

    const groupedExpenses = expenses.reduce((acc, { categoria = "Outros", valor = 0 }) => {
      acc[categoria] = (acc[categoria] || 0) + valor;
      return acc;
    }, {} as Record<string, number>);

    // Ordenar os dados com base nos valores em ordem decrescente
    const sortedEntries = Object.entries(groupedExpenses).sort(([, a], [, b]) => b - a);

    return {
      labels: sortedEntries.map(([categoria]) => categoria),
      values: sortedEntries.map(([, valor]) => valor),
    };
  }

  
  public async movimentos(costumerId: string): Promise<OverviewResumoMovimentoOutputDto> {
    const currentMonth = new Date().getMonth() + 1;
    const monthsArray = Array.from({ length: 12 }, (_, index) => index + 1);
    const currentYear = new Date().getFullYear()

    const [expensesMonths, incomesMonths] = await Promise.all([
      this.prismaClient.expensesMonths.findMany({
        where: {
          customerId: costumerId,
          ano: currentYear,
          mes: {
            gte: 1, lte: 12            
          }
        },
      }),
      this.prismaClient.incomeMonths.findMany({
        where: {
          customerId: costumerId,
          ano: currentYear,
          mes: {
            gte: 1, lte: 12            
          }
        },
      }),
    ]);

    const expensesMap = expensesMonths.reduce((acc, { mes, valor }) => {
      acc[mes] = (acc[mes] || 0) + valor;
      return acc;
    }, {} as Record<number, number>);

    const incomesMap = incomesMonths.reduce((acc, { mes, valor }) => {
      acc[mes] = (acc[mes] || 0) + valor;
      return acc;
    }, {} as Record<number, number>);

    const despesas = monthsArray.map((mes) => expensesMap[mes] || 0);
    const receitas = monthsArray.map((mes) => incomesMap[mes] || 0);

    const balanco = monthsArray.map((_, index) => receitas[index] - despesas[index]);

    return { receitas, balanco, despesas };
  }
}
