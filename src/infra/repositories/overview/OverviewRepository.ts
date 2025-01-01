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

  try {
    const startDate = new Date(input.inicio);
    const endDate = new Date(input.fim);
    const ano = new Date(input.inicio).getFullYear()

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error('Datas de início ou fim inválidas');
    }

    const fetchData = async (model: any, where: any) => {
      return model.findMany({
        where,
      });
    };

    const [incomes, expenses, expensesPaid, expensesPending] = await Promise.all([
      fetchData(this.prismaClient.incomeMonths, {
        customerId: input.customerId,
        ano: ano,
        recebimento: { gte: startDate, lte: endDate },
      }),
      fetchData(this.prismaClient.expensesMonths, {
        customerId: input.customerId,
        ano: ano,
        vencimento: { gte: startDate, lte: endDate },
      }),
      fetchData(this.prismaClient.expensesMonths, {
        customerId: input.customerId,
        ano: ano,
        vencimento: { gte: startDate, lte: endDate },
        status: 1, // Paga
      }),
      fetchData(this.prismaClient.expensesMonths, {
        customerId: input.customerId,
        ano: ano,
        vencimento: { gte: startDate, lte: endDate },
        status: 2, // Pendente
      }),
    ]);

    const calculateTotal = (items: any[]) => items?.reduce((sum, item) => sum + (item.valor || 0), 0) || 0;

    const totalIncomes = incomes ? calculateTotal(incomes) : 0;
    const totalExpenses = expenses ? calculateTotal(expenses) : 0;
    const totalPaid = expensesPaid ? calculateTotal(expensesPaid) : 0;
    const totalPending = expensesPending ? calculateTotal(expensesPending) : 0;
    const totalBalance = totalIncomes && totalExpenses ? totalIncomes - totalExpenses : 0;

    const ensureFiveValues = (arr: number[]): number[] => {
      const slicedArr = arr.slice(-5);
      return [...Array(5 - slicedArr.length).fill(0), ...slicedArr];
    };

    const result: OverviewSparkTotalOutputDto = {
      totalReceitas: { value: totalIncomes, values: incomes ? ensureFiveValues(incomes?.map((i: any) => i.valor || 0) || []) : [] },
      totalDespesas: { value: totalExpenses, values: expenses ? ensureFiveValues(expenses?.map((i: any) => i.valor || 0) || []) : [] },
      pendente: { value: totalPending, values: expensesPending ? ensureFiveValues(expensesPending?.map((i: any) => i.valor || 0) || []) : [] },
      balanco: { value: totalBalance, values: totalIncomes && totalPaid ? ensureFiveValues([totalIncomes, totalPaid]) : [] },
    };

    return result;

  } catch (err) {
    console.error('Erro ao processar os dados:', err);
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

    return {
      labels: Object.keys(groupedExpenses),
      values: Object.values(groupedExpenses),
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
