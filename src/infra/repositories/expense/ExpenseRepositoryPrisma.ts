import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import { ExpenseGateway } from "../../../domain/expenses/gateway/ExpenseGateway";
import { Expense } from "../../../domain/expenses/entity/expense";
import { CreateExpenseMonthOutputDto, EditPerMonthInputDto, ExpenseMonthOutputDto, ExpensePerMonthOutputDto, IExpense } from "../../../domain/_interfaces/IExpense";

export class ExpenseRepositoryPrisma implements ExpenseGateway {

  private constructor(private readonly prismaClient: PrismaClient){}  
  
  public static build(prismaClient: PrismaClient){
    return new ExpenseRepositoryPrisma(prismaClient)
  }

  //modelar para o banco
  public async create(expense: Expense): Promise<Expense> {
    const data = {
      id: uuidv4(),
      nome: expense.expense.nome,
      recorrente: expense.expense.recorrente,
      vencimento: expense.expense.vencimento,
      frequencia: expense.expense.frequencia,
      replicar: expense.expense.replicar,
      customerId: expense.expense.customerId,
    }   

    await this.prismaClient.expenses.create({
      data
    })

    return Expense.with(data)
  }

  public async createMonth(mes: CreateExpenseMonthOutputDto[]): Promise<void> {
    const data = mes.map((m) => ({
      id: uuidv4(),
      mes: m.mes,
      ano: m.ano,
      valor: Number(m.valor),
      status: Number(m.status),
      despesaId: m.despesaId,
      descricao: m.descricao,
      customerId: m.customerId,
      vencimento: m.vencimento,
      observacao: m.observacao,
    })); 

    await this.prismaClient.expensesMonths.createMany({
      data
    })
  }

  public async findByMonthYearAndCustomer(mes: number, ano: number, customerId: string): Promise<CreateExpenseMonthOutputDto[]> {
    const expenses = await this.prismaClient.expensesMonths.findMany({
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
        despesaId: true,
        customerId: true,
        vencimento: true,
        observacao: true,
      },
    });

    const formattedExpenses: ExpenseMonthOutputDto[] = expenses.map((expense) => ({
      id:  expense.id,
      mes: expense.mes,
      despesaId: expense.despesaId,
      ano: expense.ano,
      valor: expense.valor.toString(),
      status: expense.status.toString(),
      descricao: expense.descricao,
      customerId: expense.customerId,
      vencimento: expense.vencimento,
      observacao: expense.observacao,
    }));

    return formattedExpenses;
  }

  public async getExpensePerMonth(mes: number, ano: number, customerId: string): Promise<ExpensePerMonthOutputDto[]> {
    if(!mes || !ano || !customerId)  {
      return []
    }
    
    const expenses = await this.prismaClient.expenses.findMany({
      where: {
        customerId,
      },
      select: {
        id: true,
        nome: true,
        recorrente: true,
        vencimento: true,
        frequencia: true,
        replicar: true,
        customerId: true,
      },
    });

    const months = await this.prismaClient.expensesMonths.findMany({
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
        despesaId: true,
        descricao: true,
        customerId: true,
        vencimento: true,
        observacao: true
      },
    });

    const formattedExpenses = expenses.map((expense) => ({
      id: expense.id,
      nome: expense.nome,
      recorrente: expense.recorrente,
      vencimento: expense.vencimento,
      frequencia: expense.frequencia,
      replicar: expense.replicar,
      customerId: expense.customerId,
      meses: months
        .filter((month) => month.customerId === expense.customerId && month.despesaId === expense.id)
        .map((month) => ({
          id: month.id,
          mes: month.mes,
          ano: month.ano,
          valor: month.valor.toString(),
          status: month.status.toString(),
          despesaId: month.despesaId,
          descricao: month.descricao,
          customerId: month.customerId,
          vencimento: month.vencimento,
          observacao: month.observacao,
        })),
    }));

    return formattedExpenses;
  }
  
  public async edit(expense: EditPerMonthInputDto, customerId: string): Promise<void> {
    const { id, nome, recorrente, vencimento, frequencia, replicar, meses } = expense;

    if (meses && meses.length >= 1) {
      const updatePromises = meses.map(async (mes) =>
        await this.prismaClient.expensesMonths.update({
          where: {
            id: id,
            customerId: customerId,
            mes: mes.mes
          },
          data: {
            valor: Number(mes.valor),
            descricao: mes.descricao,
            observacao: mes.observacao,
            ano: mes.ano,
            status: Number(mes.status),
            vencimento: mes.vencimento,
          },
        })
      );

      await Promise.all(updatePromises);
    } else {
      await this.prismaClient.expenses.update({
        where: {
          id,
        },
        data: {
          nome,
          recorrente,
          vencimento,
          frequencia,
          replicar,
        },
      });
    }
  }
 
  public async delete(customerId: string, id: string, mes?: number): Promise<void> {
    if (mes) {
      await this.prismaClient.expensesMonths.deleteMany({
        where: {
          customerId: customerId,
          despesaId: id,
          mes: mes,
        },
      });
    } else {
      await this.prismaClient.$transaction(async (prisma) => {
        await prisma.expensesMonths.deleteMany({
          where: {
            customerId: customerId,
            despesaId: id,
          },
        });
  
        await prisma.expenses.delete({
          where: {
            customerId,
            id,
          },
        });
      });
    }
  }
}