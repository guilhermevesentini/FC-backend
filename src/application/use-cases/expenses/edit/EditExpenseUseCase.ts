import { Expense } from "../../../../domain/entities/expenses/expense";
import { EditPerMonthInputDto, EditPerMonthOutputDto, ExpenseModelInputDto, IExpenseMonth } from "../../../../domain/interfaces/IExpense";
import { ExpenseGateway } from "../../../../infra/gateways/expenses/ExpenseGateway";
import { UseCase } from "../../UseCase";

export class EditExpenseUseCase implements UseCase<ExpenseModelInputDto, EditPerMonthOutputDto> {
  private constructor(private readonly expenseGateway: ExpenseGateway) {}

  public static create(expenseGateway: ExpenseGateway): EditExpenseUseCase {
    return new EditExpenseUseCase(expenseGateway);
  }

  public async execute(input: ExpenseModelInputDto, customerId?: string, despesaId?: string): Promise<EditPerMonthOutputDto> {
  // Convert `input` to `ExpenseModelDto` if necessary
  const expense: ExpenseModelInputDto = {
    id: input.id,
    nome: input.nome,
    recorrente: input.recorrente,
    replicar: input.replicar,
    vencimento: input.vencimento,
    frequencia: input.frequencia,
    valor: input.valor || '0',
    descricao: input.descricao || "",
    observacao: input.observacao || "",
    status: input.status || "active",
    customerId: customerId || "",
    despesaId: input.despesaId,
    mes: input.mes,
    ano: input.ano
  };

  const aExpense = await Expense.create(expense);

  const aMonths: IExpenseMonth[] = expense.replicar
    ? await this.generateRecurringMonths(expense, customerId!)
    : [await this.buildMonth(expense)];

  const expenseModel: EditPerMonthInputDto = {
    ...aExpense,
    meses: aMonths,
  };

  await this.expenseGateway.edit(expenseModel, customerId!);

  return this.presentOutput(expenseModel);
}


private async generateRecurringMonths(
  expense: ExpenseModelInputDto,
  customerId: string
): Promise<IExpenseMonth[]> {
  const months: IExpenseMonth[] = [];
  const startDate = new Date(expense.vencimento);

  for (let month = expense.mes; month <= 12; month++) {
    const currentDate = new Date(startDate.getFullYear(), month - 1, startDate.getDate());

    const mes = Expense.createMonth(expense, expense.id); // Presume-se que retorna detalhes do mês
    const newMonth = Expense.create({
      ...expense,
      customerId,
      vencimento: currentDate,
    });

    months.push({
      ...newMonth,
      ...mes,
    });
  }

  return months;
}


  private async buildMonth(expense: ExpenseModelInputDto): Promise<IExpenseMonth> {
    const mes = {
      id: expense.id,
      ano: expense.ano,
      mes: expense.mes,
      valor: expense.valor,
      descricao: expense.descricao,
      observacao: expense.observacao,
      status: expense.status,
      vencimento: new Date(expense.vencimento),
      customerId: expense.customerId,
      despesaId: expense.id,
    };

    return mes
  }

  private presentOutput(expense: EditPerMonthInputDto): EditPerMonthOutputDto {
    return {
      id: expense.id,
      customerId: expense.customerId,
      vencimento: expense.vencimento,
      frequencia: expense.frequencia,
      nome: expense.nome,
      recorrente: expense.recorrente,
      replicar: expense.replicar,
      meses: expense.meses,
    };
  }
}
