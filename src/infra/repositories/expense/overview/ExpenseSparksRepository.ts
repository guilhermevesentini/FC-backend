import { PrismaClient } from "@prisma/client";
import { ExpenseSparkTotalInputDto, ExpenseSparkTotalOutputDto } from "../../../../application/use-cases/expenses/overview/sparks/EXpenseSparkUseCaseDto";
import { ExpenseSparksGateway } from "../../../gateways/expenses/overview/ExpenseSparksGateway";

export class ExpenseSparksRepositoryPrisma implements ExpenseSparksGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}  
  
  public static build(prismaClient: PrismaClient) {
    return new ExpenseSparksRepositoryPrisma(prismaClient);
  }

  public async sparkTotal(input: ExpenseSparkTotalInputDto): Promise<ExpenseSparkTotalOutputDto> {
    const expenses = await this.prismaClient.expensesMonths.findMany({
      where: {
        customerId: input.customerId,
        vencimento: {
          gte: new Date(input.inicio),
          lte: new Date(input.fim),
        },
      }
    });

    const total = expenses.map((i) => i.valor);
    const totalSum = total.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

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

    const totalBalance = totalSum - totalPaid;

    const ensureFiveValues = (arr: number[]): number[] => {
        return [...arr.slice(-5)].reverse().concat(Array(5 - arr.length).fill(0)).reverse();
    };

    return {
      total: {
        value: totalSum,
        values: ensureFiveValues(total),
      },
      pago: {
        value: totalPaid,
        values: ensureFiveValues(paidValues),
      },
      pendente: {
        value: totalPending,
        values: ensureFiveValues(pendingValues),
      },
      balanco: {
        value: totalBalance,
        values: ensureFiveValues([totalSum, totalPaid]),
      }
    };
  }
}
