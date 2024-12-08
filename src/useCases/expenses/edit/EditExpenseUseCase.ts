import { CreateExpenseMonthOutputDto, EditPerMonthInputDto, EditPerMonthOutputDto, ExpenseModelInputDto, IExpenseMonth } from "../../../domain/_interfaces/IExpense";
import { Expense } from "../../../domain/expenses/entity/expense";
import { ExpenseMonth } from "../../../domain/expenses/entity/expenseMonth";
import { ExpenseGateway } from "../../../domain/expenses/gateway/ExpenseGateway";
import { UseCase } from "../../usercase";

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
    ...aExpense.expense,
    meses: aMonths,
  };

  await this.expenseGateway.edit(expenseModel, customerId!);

  return this.presentOutput(expenseModel);
}


  private async generateRecurringMonths(
    expense: ExpenseModelInputDto,
    customerId: string
  ): Promise<IExpenseMonth[]> {
    const months: Promise<IExpenseMonth>[] = [];
    const startDate = new Date(expense.vencimento);

    for (let month = expense.mes; month <= 12; month++) {
      const newMonth = ExpenseMonth.create({
        ...expense,
        customerId,
        despesaId: expense.id,
        mes: month,
        ano: expense.ano,
        vencimento: new Date(startDate.getFullYear(), month - 1, startDate.getDate()),
      });

      months.push(newMonth);
    }

    return Promise.all(months);
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
