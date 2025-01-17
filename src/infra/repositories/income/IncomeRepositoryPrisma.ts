import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { IncomeGateway } from '../../gateways/income/IncomeGateway';
import { GetIncomeInputDto, IncomeDto, IncomeInputDto, IncomeMonthDto } from '../../../application/dtos/IncomeDto';

export class IncomeRepositoryPrisma implements IncomeGateway {

  private constructor(private readonly prismaClient: PrismaClient) { }  
  
  public static build(prismaClient: PrismaClient) {
    return new IncomeRepositoryPrisma(prismaClient)
  }

  public async create(income: IncomeDto, monthsData: IncomeMonthDto[]): Promise<IncomeDto> {
    if (!income.customerId) throw new Error('Erro ao autenticar usuário')
    
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

    if (!monthsData.length) throw new Error('Ocorreu um problema ao criar os meses');
    if (!incomeData.id) throw new Error('Não é possível criar os meses por conta de identificação.');

    
    const months = monthsData?.map((m) => ({
      id: uuidv4(),
      mes: m.mes,
      ano: m.ano,
      valor: parseFloat(Number(m.valor).toFixed(2)),
      contaId: m.contaId,
      status: Number(m.status),
      incomeId: incomeData.id,
      descricao: m.descricao,
      customerId: m.customerId,
      recebimento: m.recebimento,
      observacao: m.observacao,
      categoria: m.categoria
    }));

    const isInvalidMonth = months?.map((mes) => mes.mes >= 13 || mes.mes <= 0).some((item) => item == true)

    if (isInvalidMonth) throw new Error('Mes incorreto')

    try {
      await this.prismaClient.incomes.create({
        data: incomeData,
      });

      if (months) {
        await this.prismaClient.incomeMonths.createMany({
          data: months,
        });
      }
    } catch (err) {
      console.log('Erro ao criar receita:', err);
      throw new Error('Erro ao criar receita');
    }

    return {
      ...incomeData,
      meses: months?.map((m) => ({
        ...m,
        valor: m.valor.toString(),
        status: m.status.toString(),
      })),
    };
  }

  public async get(mes: number, ano: number, customerId: string): Promise<IncomeDto[]> {
    if (!customerId) throw new Error('Erro ao autenticar usuário');
        
    const incomes = await this.prismaClient.incomes.findMany({
      where: {
        customerId,
      }
    });

    const months = await this.prismaClient.incomeMonths.findMany({
      where: {
        mes,
        ano,
        customerId,
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
        contaId: true,
      },
    });

    const formattedIncomes: IncomeDto[] = incomes.map((income) => {
      const filteredMonths = months.filter((mes) => mes.incomeId === income.id);

      const mappedMonths = filteredMonths.map((mes) => ({
        id: mes.id,
        mes: mes.mes,
        incomeId: mes.incomeId,
        ano: mes.ano,
        contaId: mes.contaId,
        valor: mes.valor.toString(),
        status: mes.status.toString(),
        descricao: mes.descricao,
        customerId: mes.customerId,
        recebimento: mes.recebimento,
        observacao: mes.observacao,
        categoria: mes.categoria,
      }));

      return {
        ...income,
        meses: mappedMonths,
      };
    });
    
    return formattedIncomes;
  }

  public async edit(income: IncomeInputDto): Promise<void> {
    if (!income.customerId) throw new Error('Erro ao autenticar usuário')
    
    const existingIncome = await this.prismaClient.incomes.findUnique({
      where: {
        id: income.incomeId
      },
    });

    if (!existingIncome) {
      throw new Error(`Receita não encontrada para o mês ${income.mes} e ano ${income.ano}`);
    }

    await this.prismaClient.incomes.update({
      where: { id: existingIncome.id },
      data: {
        nome: income.nome,
        recebimento: income.recebimento,
        tipoLancamento: income.tipoLancamento,
        inicio: income.range?.inicio,
        fim: income.range?.fim,
        replicar: income.replicar,
      },
    });

    await this.editMonth(income)
  }
  
  public async editMonth(mes: IncomeInputDto): Promise<void> {
    if (!mes || mes.mes >= 13 || mes.mes <= 0) throw new Error('Mes incorreto')
    
    const existingIncomeMonth = await this.prismaClient.incomeMonths.findUnique({
      where: {
        id: mes.id,
        mes: Number(mes.mes)
      },
    });

    if (!existingIncomeMonth) {
      throw new Error(`Receita não encontrada para o mês ${mes.mes} e ano ${mes.ano}`);
    }

    const valor = parseFloat(Number(mes.valor).toFixed(2));

    await this.prismaClient.incomeMonths.update({
      where: {
        id: existingIncomeMonth.id,
      },
      data: {
        valor: valor,
        descricao: mes.descricao,
        observacao: mes.observacao,
        recebimento: mes.recebimento,
        status: Number(mes.status),
        categoria: mes.categoria,
        ano: mes.ano,
        mes: mes.mes,
        contaId: mes.contaId
      },
    });
  }

  public async delete(customerId: string, id: string, mes?: number): Promise<void> {
    if (!mes || !customerId || !id) throw new Error('Houve um erro ao deletar')
    
    if (mes == 99) {
      await this.prismaClient.$transaction(async (prisma) => {
        await prisma.incomeMonths.deleteMany({
          where: {
            customerId: customerId,
            incomeId: id,
          },
        });
  
        await prisma.incomes.delete({
          where: {
            customerId,
            id,
          },
        });
      });      
    } else {
      await this.prismaClient.incomeMonths.deleteMany({
        where: {
          customerId: customerId,
          incomeId: id,
          mes: mes,
        },
      });

      const months = await this.prismaClient.incomeMonths.findMany({
        where: {
          incomeId: id,
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
          contaId: true,
        },
      });

      if (months.length == 0) {
        await this.prismaClient.incomes.deleteMany({
          where: {
            customerId,
            id: id,
          },
        });
      }
    }
  }
}