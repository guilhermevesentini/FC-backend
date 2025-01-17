import { ETipoOptions } from "../../../@types/enums";
import { Expense } from "../../../domain/entities/expenses/expense";
import { ExpenseCreateInstallmentstrategy, IExpenseCreateInstallmentsStrategy } from "../../../domain/factories/expense/create/strategies/ExpenseCreateInstallmentsStrategy";
import { ExpenseCreateMonthStrategy, IExpenseCreateMonthStrategy } from "../../../domain/factories/expense/create/strategies/ExpenseCreateMonthStrategy";
import { ExpenseCreateRecurringMonthsStratregy, IExpenseCreateRecurringMonthsStratregy } from "../../../domain/factories/expense/create/strategies/ExpenseCreateRecurringMonthsStratregy";
import { ExpenseGateway } from "../../../infra/gateways/expenses/ExpenseGateway";
import { ExpenseDto, ExpenseInputDto, ExpenseMonthDto } from "../../dtos/expensesDto";
import { UseCase } from "../UseCase";

export class CreateExpenseUseCase implements UseCase<ExpenseDto, ExpenseDto>{
  private createRecurring: IExpenseCreateRecurringMonthsStratregy;
  private createMonth: IExpenseCreateMonthStrategy;
  private createInstallments: IExpenseCreateInstallmentsStrategy;

  private constructor(
    private readonly expenseGateway: ExpenseGateway
  ) {
    this.createRecurring = new ExpenseCreateRecurringMonthsStratregy(),
      this.createMonth = new ExpenseCreateMonthStrategy(),
      this.createInstallments = new ExpenseCreateInstallmentstrategy()
  }

  public static create(
    expenseGateway: ExpenseGateway
  ): CreateExpenseUseCase {
    return new CreateExpenseUseCase(expenseGateway);
  }

  public async execute(expense: ExpenseInputDto): Promise<ExpenseDto> {
    let months: ExpenseMonthDto[];

    const expenseDetails = {
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
    }

    if (expense.tipoLancamento == ETipoOptions.recorrente) {
      months = this.createRecurring.create(expense);
    } else if (expense.tipoLancamento == ETipoOptions.parcelado){
      months = this.createInstallments.create(expense);
    } else {
       months = [this.createMonth.create(expense)];
    }

    const output = await this.expenseGateway.create(expenseDetails, months)

    return output   
  }
}