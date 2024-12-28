import { ExpenseGateway } from "../../../infra/gateways/expenses/ExpenseGateway";
import { DeleteExpenseInputDto } from "../../dtos/expensesDto";
import { UseCase } from "../UseCase";


export class DeleteExpenseUseCase implements UseCase<DeleteExpenseInputDto, void>{
  private constructor(
    private readonly expenseGateway: ExpenseGateway
  ) {}

  public static create(
    expenseGateway: ExpenseGateway
  ): DeleteExpenseUseCase {
    return new DeleteExpenseUseCase(expenseGateway);
  }

  public async execute(expense: DeleteExpenseInputDto): Promise<void> {
    await this.expenseGateway.delete(expense.customerId, expense.id, expense.mes)
  }
}