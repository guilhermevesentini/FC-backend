import { ExpenseModelDto, IExpenseMonth, IExpensePerMonth } from '../../_interfaces/IExpense';
import { ExpenseModel } from './expenseModel';

export class ExpenseBuilder {
  private expense: IExpensePerMonth;

  constructor() {
    this.expense = {
      id: '',
      nome: '',
      recorrente: '1',
      vencimento: new Date(),
      frequencia: '',
      replicar: false,
      customerId: '',
      meses: [],
    };
  }

  setExpenseDetails(input: ExpenseModelDto): IExpensePerMonth {
    const expense = {
      ...this.expense,
      id: input.id,
      nome: input.nome,
      recorrente: input.recorrente,
      vencimento: input.vencimento,
      frequencia: input.frequencia,
      replicar: input.replicar,
      customerId: input.customerId,
      meses: this.addMonths(input)
    };

    return expense;
  }

  addMonths(input: ExpenseModelDto): IExpenseMonth[] {
    const { vencimento, recorrente } = input;

    const months: IExpenseMonth[] = [];
    const currentDate = new Date(vencimento);
    const currentYear = currentDate.getFullYear();

    if (recorrente === '1') {
      // Criar meses do vencimento até o último mês do ano
      const startMonth = currentDate.getMonth() + 1; // Janeiro = 0
      for (let month = startMonth; month <= 12; month++) {
        months.push(this.buildMonth(input, month, currentYear));
      }
    } else if (recorrente === '2') {
      // Criar apenas o mês atual
      const currentMonth = currentDate.getMonth() + 1; // Janeiro = 0
      months.push(this.buildMonth(input, currentMonth, currentYear));
    }

    return months;
  }

  private buildMonth(input: ExpenseModelDto, month: number, year: number): IExpenseMonth {
    return {
      id: input.id,
      ano: year,
      mes: month,
      valor: input.valor,
      descricao: input.descricao,
      observacao: input.observacao,
      status: input.status,
      vencimento: new Date(year, month - 1, input.vencimento.getDate()),
      customerId: input.customerId,
      despesaId: input.id,
    };
  }

  build(): ExpenseModel {
    return new ExpenseModel(this.expense);
  }
}
