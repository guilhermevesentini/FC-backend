import { ExpenseMonth } from "../../../../domain/entities/expenses/expenseMonth";
import { ExpenseGateway } from "../../../../infra/gateways/expenses/ExpenseGateway";
import { CreateExpenseMonthPresenter } from "../../../../interfaces/presenters/expenses/CreateExpenseMonthPresenter";
import { CreateExpenseMonthInputDto, ExpenseMonthDto } from "../../../dtos/expenses/expensesDto";
import { UseCase } from "../../UseCase";

export class CreateExpenseMonthUseCase implements UseCase<CreateExpenseMonthInputDto, ExpenseMonthDto[]>{
  private createMonthPresenter: CreateExpenseMonthPresenter;

  private constructor(
    private readonly expenseGateway: ExpenseGateway
  ) {
    this.createMonthPresenter = new CreateExpenseMonthPresenter
  }

  public static create(
    expenseGateway: ExpenseGateway
  ): CreateExpenseMonthUseCase {
    return new CreateExpenseMonthUseCase(expenseGateway);
  }

  public async execute(input: CreateExpenseMonthInputDto): Promise<ExpenseMonthDto[]> {
    const aMonth = await Promise.all(
      input.mes.map(async (m) => {
        return await ExpenseMonth.create({...m, customerId: input.customerId, despesaId: input.despesaId});
      })
    );

    await this.expenseGateway.createMonth(aMonth)

    const output: ExpenseMonthDto[] = aMonth.map((m: ExpenseMonthDto) => this.createMonthPresenter.month(m))

    return output
  }
}