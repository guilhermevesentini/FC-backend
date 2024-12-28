import { PrismaClient } from "@prisma/client";
import { OverviewSparkTotalInputDto, OverviewSparkTotalOutputDto } from "../../../application/dtos/overviewDto";
import { OverviewSparksGateway } from "../../gateways/overview/OverviewSparksGateway";

export class OverviewSparksRepositoryPrisma implements OverviewSparksGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}  
  
  public static build(prismaClient: PrismaClient) {
    return new OverviewSparksRepositoryPrisma(prismaClient);
  }

  public async sparkTotal(input: OverviewSparkTotalInputDto): Promise<OverviewSparkTotalOutputDto> {
    const incomes = await this.prismaClient.incomeMonths.findMany({
      where: {
        customerId: input.customerId,
        recebimento: {
          gte: new Date(input.inicio),
          lte: new Date(input.fim),
        },
      }
    });

    const valuesIncomes = incomes.map((i) => i.valor);
    const totalIncomes = valuesIncomes.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const expenses = await this.prismaClient.expensesMonths.findMany({
      where: {
        customerId: input.customerId,
        vencimento: {
          gte: new Date(input.inicio),
          lte: new Date(input.fim),
        },
      }
    });

    const valuesExpenses = expenses.map((i) => i.valor);
    const totalExpenses = valuesExpenses.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const expensesPaid = await this.prismaClient.expensesMonths.findMany({
      where: {
        customerId: input.customerId,
        vencimento: {
          gte: new Date(input.inicio),
          lte: new Date(input.fim),
        },
        status: 1,
      }
    });

    const paidValues = expensesPaid.map((i) => i.valor);
    const totalPaid = paidValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const expensesPending = await this.prismaClient.expensesMonths.findMany({
      where: {
        customerId: input.customerId,
        vencimento: {
          gte: new Date(input.inicio),
          lte: new Date(input.fim),
        },
        status: 2,
      }
    });

    const pendingValues = expensesPending.map((i) => i.valor);
    const totalPending = pendingValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const totalBalance = totalIncomes - totalExpenses;

    const ensureFiveValues = (arr: number[]): number[] => {
        return [...arr.slice(-5)].reverse().concat(Array(5 - arr.length).fill(0)).reverse();
    };

    return {
      totalReceitas: {
        value: totalIncomes,
        values: ensureFiveValues(valuesIncomes),
      },
      totalDespesas: {
        value: totalExpenses,
        values: ensureFiveValues(valuesExpenses),
      },
      pendente: {
        value: totalPending,
        values: ensureFiveValues(pendingValues),
      },
      balanco: {
        value: totalBalance,
        values: ensureFiveValues([totalIncomes, totalPaid]),
      }
    };
  }
}
