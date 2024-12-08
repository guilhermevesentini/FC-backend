
import { ExpenseModelDto, IExpense, IExpensePerMonth } from '../../_interfaces/IExpense';
import { ExpenseBuilder } from './expenseBuilder';

export class ExpenseModel {
  private props: IExpensePerMonth;

  constructor(props: IExpensePerMonth) {
    this.props = props;
  }

  public static async create(input: ExpenseModelDto): Promise<ExpenseModel> {
    const builderExpense = new ExpenseBuilder().setExpenseDetails(input);

    return new ExpenseModel(builderExpense);
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
