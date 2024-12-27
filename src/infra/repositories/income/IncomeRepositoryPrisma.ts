import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { IncomeGateway } from '../../gateways/income/IncomeGateway';
import { GetIncomeInputDto, IncomeDto } from '../../../application/dtos/IncomeDto';

export class IncomeRepositoryPrisma implements IncomeGateway {

  private constructor(private readonly prismaClient: PrismaClient) { }
  
  public static build(prismaClient: PrismaClient) {
    return new IncomeRepositoryPrisma(prismaClient)
  }

  public async create(income: IncomeDto): Promise<void> {
    const incomeData = {
      id: uuidv4(),
      nome: income.nome,
      recebimento: income.recebimento,
      tipoLancamento: income.tipoLancamento,
      inicio: income.range?.inicio,
      fim: income.range?.fim,
      replicar: income.replicar,
      customerId: income.customerId,
    }
    
    const months = income.meses?.map((m) => ({
      id: uuidv4(),
      mes: m.mes,
      ano: m.ano,
      valor: parseFloat(Number(m.valor).toFixed(2)),
      status: Number(m.status),
      incomeId: incomeData.id,
      contaId: m.contaId,
      descricao: m.descricao,
      customerId: m.customerId,
      recebimento: m.recebimento,
      observacao: m.observacao,
      categoria: m.categoria
    }));

    await this.prismaClient.incomes.create({
      data: incomeData
    })

    if (months) {
      await this.prismaClient.incomeMonths.createMany({
        data: months
      })
    }
  }

  public async get(input: GetIncomeInputDto): Promise<IncomeDto[]> {
    const startDate = new Date(input.ano, input.mes - 1, 1);
    const endDate = new Date(input.ano, input.mes, 0);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.error("Data inválida:", startDate, endDate);
      throw new Error("Data inválida fornecida.");
    }

    const incomes = await this.prismaClient.incomes.findMany({
      where: {
        customerId: input.customerId
      }
    });

    const months = await this.prismaClient.incomeMonths.findMany({
      where: {
        mes: input.mes,
        ano: input.ano,
        customerId: input.customerId,
      },
      select: {
        id: true,
        mes: true,
        ano: true,
        valor: true,
        status: true,
        descricao: true,
        incomeId: true,
        customerId: true,
        recebimento: true,
        observacao: true,
        categoria: true,
        contaId: true
      },
    });

    const formattedIncomes: IncomeDto[] = incomes.map((income) => ({
          ...income,
          meses: months.map((mes) => {
            return {
              id:  mes.id,
              mes: mes.mes,
              incomeId: mes.incomeId,
              ano: mes.ano,
              valor: mes.valor.toString(),
              status: mes.status.toString(),
              descricao: mes.descricao,
              customerId: mes.customerId,
              recebimento: mes.recebimento,
              observacao: mes.observacao,
              categoria: mes.categoria,
              contaId: mes.contaId
            }
          })
          
        }));

    return formattedIncomes
  }
}