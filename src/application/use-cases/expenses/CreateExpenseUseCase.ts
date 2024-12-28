import { ETipoOptions } from "../../../@types/enums";
import { Expense } from "../../../domain/entities/expenses/expense";
import { ExpenseCreateMonthStrategy, IExpenseCreateMonthStrategy } from "../../../domain/factories/expense/create/strategies/ExpenseCreateMonthStrategy";
import { ExpenseCreateRecurringMonthsStratregy, IExpenseCreateRecurringMonthsStratregy } from "../../../domain/factories/expense/create/strategies/ExpenseCreateRecurringMonthsStratregy";
import { ExpenseGateway } from "../../../infra/gateways/expenses/ExpenseGateway";
import { ExpenseDto, ExpenseInputDto, ExpenseMonthDto } from "../../dtos/expensesDto";
import { UseCase } from "../UseCase";

export class CreateExpenseUseCase implements UseCase<ExpenseDto, ExpenseDto>{
  private createRecurring: IExpenseCreateRecurringMonthsStratregy;
  private createMonth: IExpenseCreateMonthStrategy;

  private constructor(
    private readonly expenseGateway: ExpenseGateway
  ) {
    this.createRecurring = new ExpenseCreateRecurringMonthsStratregy(),
    this.createMonth = new ExpenseCreateMonthStrategy()
  }

  public static create(
    expenseGateway: ExpenseGateway
  ): CreateExpenseUseCase {
    return new CreateExpenseUseCase(expenseGateway);
  }

  public async execute(expense: ExpenseInputDto): Promise<ExpenseDto> {
    let strategy: ExpenseDto;
    let months: ExpenseMonthDto[];

    if (expense.tipoLancamento == ETipoOptions.recorrente) {//tratar aqui a seleção de range
      months = this.createRecurring.create(expense);
    } else {
      months = [this.createMonth.create(expense)];
    }

    strategy = {
      id: expense.id,
      vencimento: expense.vencimento,
      replicar: expense.replicar,
      tipoLancamento: expense.tipoLancamento,
      range: {
        inicio: expense.range?.inicio || undefined,
        fim: expense.range?.fim || undefined
      },
      nome: expense.nome,
      customerId: expense.customerId,
      meses: months
    }

    const expenseOutput =  Expense.create(strategy);

    await this.expenseGateway.create(expenseOutput)
    
    return expenseOutput
  }
}