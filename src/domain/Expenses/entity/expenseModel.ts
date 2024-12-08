
import { ExpenseModelDto, IExpense, IExpensePerMonth } from '../../_interfaces/IExpense';
import { ExpenseBuilder } from './expenseBuilder';

export class ExpenseModel {
  private props: IExpensePerMonth;

  constructor(props: IExpensePerMonth) {
    this.props = props;
  }

  public static async create(input: ExpenseModelDto): Promise<ExpenseModel> {
    // Usando o ExpenseBuilder para criar a estrutura completa
    const builder = new ExpenseBuilder()
      .setExpenseDetails(input)
      .addMonths(input);

    const expenseData = builder.build().expense;
    return new ExpenseModel(expenseData);
  }

  public static buildExpense(input: ExpenseModelDto): IExpense {
    if (!input.id || !input.nome) {
      throw new Error('Campos obrigatórios estão ausentes no input');
    }

    return {
      id: input.id,
      nome: input.nome,
      recorrente: input.recorrente,
      vencimento: input.vencimento,
      frequencia: input.frequencia,
      replicar: input.replicar,
      customerId: input.customerId,
    };
  }

  public get expense(): Readonly<IExpensePerMonth> {
    return { ...this.props };
  }
}
