import { DeleteExpenseInputDto } from "../../../domain/_interfaces/IExpense";
import { ExpenseGateway } from "../../../domain/expenses/gateway/ExpenseGateway";
import { UseCase } from "../../usercase";


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