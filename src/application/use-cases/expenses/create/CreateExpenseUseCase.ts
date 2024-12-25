import { Expense } from "../../../../domain/entities/expenses/expense";
import { ExpenseGateway } from "../../../../infra/gateways/expenses/ExpenseGateway";
import { ExpensePresenter } from "../../../../interfaces/presenters/expenses/ExpensePresenter";
import { ExpenseDto, ExpenseInputDto } from "../../../dtos/expensesDto";
import { UseCase } from "../../UseCase";

export class CreateExpenseUseCase implements UseCase<ExpenseDto, ExpenseDto>{
  private expensePresenter: ExpensePresenter

  private constructor(
    private readonly expenseGateway: ExpenseGateway
  ) {
    this.expensePresenter = new ExpensePresenter    
  }

  public static create(
    expenseGateway: ExpenseGateway
  ): CreateExpenseUseCase {
    return new CreateExpenseUseCase(expenseGateway);
  }

  public async execute(expense: ExpenseInputDto): Promise<ExpenseDto> {
    const aExpense = Expense.create(expense);

    const response = await this.expenseGateway.create(aExpense)

    const output: ExpenseDto = this.expensePresenter.expense(response)

    return output
  }
}