import { PrismaClient } from "@prisma/client";
import { OverviewDonutGateway } from "../../gateways/overview/OverviewDonutGateway";
import { OverviewDonuOutputDto, OverviewDonutInputDto } from "../../../application/dtos/overviewDto";

export class OverviewDonutRepositoryPrisma implements OverviewDonutGateway {
  private constructor(private readonly prismaClient: PrismaClient){}  
    
  public static build(prismaClient: PrismaClient){
    return new OverviewDonutRepositoryPrisma(prismaClient)
  }
  
  public async donutTotal(input: OverviewDonutInputDto): Promise<OverviewDonuOutputDto> {
    const expenses = await this.prismaClient.expensesMonths.findMany({
      where: {
        customerId: input.customerId,
        vencimento: {
          gte: new Date(input.inicio),
          lte: new Date(input.fim),
        },
      }
    });

    if (!expenses || expenses.length === 0) {
        return {
            labels: [],
            values: []
        };
    }

    const groupedExpenses = expenses.reduce((acc, expense) => {
        const categoria = expense.categoria || "Outros";
        const valor = expense.valor || 0;
        if (!acc[categoria]) {
            acc[categoria] = 0;
        }
        acc[categoria] += valor;
        return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(groupedExpenses);
    const values = Object.values(groupedExpenses);

    return {
        labels: labels,
        values: values
    };
}

}