import { Expense } from "../../../../domain/entities/expenses/expense";
import { CreateExpenseInputDto } from "../../../../domain/interfaces/IExpense";
import { ExpenseGateway } from "../../../../infra/gateways/expenses/ExpenseGateway";
import { ExpensePresenter } from "../../../../interfaces/presenters/expenses/ExpensePresenter";
import { ExpenseDto } from "../../../dtos/expenses/expensesDto";
import { UseCase } from "../../UseCase";

export class CreateExpenseUseCase implements UseCase<CreateExpenseInputDto, ExpenseDto>{
  private expensePresenter: ExpensePresenter

  private constructor(
    private readonly expenseGateway: ExpenseGateway
  ) {
    this.expensePresenter = new ExpensePresenter;
  }

  public static create(
    expenseGateway: ExpenseGateway
  ): CreateExpenseUseCase {
    return new CreateExpenseUseCase(expenseGateway);
  }

  public async execute(expense: CreateExpenseInputDto): Promise<ExpenseDto> {
    const aExpense = await Expense.create(expense);

    const response = await this.expenseGateway.create(aExpense)

    const output: ExpenseDto = this.expensePresenter.expense(response)

    return output
  }
}