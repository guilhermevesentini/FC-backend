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
      console.error('Parâmetros inválidos:', {
        customerId: input.customerId,
        inicio: input.inicio,
        fim: input.fim,
      });
      throw new Error('Parâmetros inválidos: customerId, inicio ou fim estão ausentes');
    }

    try {
      console.log("Input recebido:", input);

      console.log("Buscando incomes...");
      const incomes = await this.prismaClient.incomeMonths.findMany({
        where: {
          customerId: input.customerId,
          recebimento: { gte: new Date(input.inicio), lte: new Date(input.fim) },
        },
      });
      console.log("Incomes encontrados:", incomes);

      console.log("Buscando expenses...");
      const expenses = await this.prismaClient.expensesMonths.findMany({
        where: {
          customerId: input.customerId,
          vencimento: { gte: new Date(input.inicio), lte: new Date(input.fim) },
        },
      });
      console.log("Expenses encontrados:", expenses);

      console.log("Buscando expensesPaid...");
      const expensesPaid = await this.prismaClient.expensesMonths.findMany({
        where: {
          customerId: input.customerId,
          vencimento: { gte: new Date(input.inicio), lte: new Date(input.fim) },
          status: 1,
        },
      });
      console.log("ExpensesPaid encontrados:", expensesPaid);

      console.log("Buscando expensesPending...");
      const expensesPending = await this.prismaClient.expensesMonths.findMany({
        where: {
          customerId: input.customerId,
          vencimento: { gte: new Date(input.inicio), lte: new Date(input.fim) },
          status: 2,
        },
      });
      console.log("ExpensesPending encontrados:", expensesPending);

      console.log("Calculando totais...");
      const totalIncomes = incomes?.reduce((sum, { valor }) => sum + (valor || 0), 0) || 0;
      const totalExpenses = expenses?.reduce((sum, { valor }) => sum + (valor || 0), 0) || 0;
      const totalPaid = expensesPaid?.reduce((sum, { valor }) => sum + (valor || 0), 0) || 0;
      const totalPending = expensesPending?.reduce((sum, { valor }) => sum + (valor || 0), 0) || 0;
      const totalBalance = totalIncomes - totalExpenses;

      console.log("Totais calculados:", {
        totalIncomes,
        totalExpenses,
        totalPaid,
        totalPending,
        totalBalance,
      });

      console.log("Formatando valores para garantir 5 entradas...");
      const ensureFiveValues = (arr: number[]): number[] => {
        const slicedArr = arr.slice(-5);
        const paddedArr = Array(5 - slicedArr.length).fill(0).concat(slicedArr);
        return paddedArr;
      };

      const result = {
        totalReceitas: { value: totalIncomes, values: ensureFiveValues(incomes?.map((i) => i.valor || 0) || []) },
        totalDespesas: { value: totalExpenses, values: ensureFiveValues(expenses?.map((i) => i.valor || 0) || []) },
        pendente: { value: totalPending, values: ensureFiveValues(expensesPending?.map((i) => i.valor || 0) || []) },
        balanco: { value: totalBalance, values: ensureFiveValues([totalIncomes, totalPaid]) },
      };

      console.log("Resultado final formatado:", result);
      return result;

    } catch (err) {
      console.error("Erro ao buscar ou processar dados:", err);
      throw new Error("Erro ao construir os sparks");
    }
  }



  public async donutTotal(input: OverviewDonutInputDto): Promise<OverviewDonuOutputDto> {
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

  // public async movimentos(costumerId: string): Promise<OverviewResumoMovimentoOutputDto> {
  //   const currentYear = new Date().getFullYear();
  //   const selectedMonth = 12; // Mês selecionado (exemplo: Dezembro)

  //   // Verifica se o mês selecionado é válido
  //   if (selectedMonth < 1 || selectedMonth > 12) {
  //     throw new Error('Mês inválido');
  //   }

  //   // Calculando o primeiro e o último dia do mês selecionado
  //   const firstDayOfMonth = new Date(currentYear, selectedMonth - 1, 1);
  //   const lastDayOfMonth = new Date(currentYear, selectedMonth, 0); // O último dia é o dia 0 do mês seguinte

  //   // Buscar dados de despesas e receitas para o mês selecionado no intervalo de datas
  //   const [expenses, incomes] = await Promise.all([
  //     this.prismaClient.expensesMonths.findMany({
  //       where: {
  //         customerId: costumerId,
  //         vencimento: {
  //           gte: firstDayOfMonth,
  //           lte: lastDayOfMonth,
  //         },
  //       },
  //     }),
  //     this.prismaClient.incomeMonths.findMany({
  //       where: {
  //         customerId: costumerId,
  //         recebimento: {
  //           gte: firstDayOfMonth,
  //           lte: lastDayOfMonth,
  //         },
  //       },
  //     }),
  //   ]);

  //   // Mapeando as despesas por dia (dia do mês)
  //   const expensesMap = expenses.reduce((acc, { vencimento, valor }) => {
  //     const day = new Date(vencimento).getDate(); // Extrai o dia do mês
  //     acc[day] = (acc[day] || 0) + valor; // Soma os valores por dia
  //     return acc;
  //   }, {} as Record<number, number>);

  //   // Mapeando as receitas por dia (dia do mês)
  //   const incomesMap = incomes.reduce((acc, { recebimento, valor }) => {
  //     const day = new Date(recebimento).getDate(); // Extrai o dia do mês
  //     acc[day] = (acc[day] || 0) + valor; // Soma os valores por dia
  //     return acc;
  //   }, {} as Record<number, number>);

  //   // Criando arrays de resultados para cada dia do mês
  //   const daysInMonth = Array.from(
  //     { length: lastDayOfMonth.getDate() }, // Cria um array de dias do mês
  //     (_, index) => index + 1
  //   );

  //   // Filtrando e mapeando as despesas e receitas
  //   const despesas = daysInMonth.map((day) => expensesMap[day] || 0).filter(value => value !== 0); // Remover dias com valor 0
  //   const receitas = daysInMonth.map((day) => incomesMap[day] || 0).filter(value => value !== 0); // Remover dias com valor 0
  //   const balanco = daysInMonth.map((_, index) => receitas[index] - despesas[index]); // Calcular o balanço por dia

  //   return { receitas, balanco, despesas };
  // }
  
  public async movimentos(costumerId: string): Promise<OverviewResumoMovimentoOutputDto> {
    const currentMonth = new Date().getMonth() + 1;
    const monthsArray = Array.from({ length: currentMonth }, (_, index) => index + 1);

    const [expensesMonths, incomesMonths] = await Promise.all([
      this.prismaClient.expensesMonths.findMany({
        where: { customerId: costumerId, mes: { gte: 1, lte: currentMonth } },
      }),
      this.prismaClient.incomeMonths.findMany({
        where: { customerId: costumerId, mes: { gte: 1, lte: currentMonth } },
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
