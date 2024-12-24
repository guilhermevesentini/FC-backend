import { ExpenseSparksGateway } from "../../../../../infra/gateways/expenses/overview/ExpenseSparksGateway";
import { UseCase } from "../../../UseCase";
import { ExpenseSparkTotalInputDto, ExpenseSparkTotalOutputDto } from "./EXpenseSparkUseCaseDto";

export class ExpenseSparkTotalUseCase implements UseCase<ExpenseSparkTotalInputDto, ExpenseSparkTotalOutputDto> {
  //private loginPresenter: LoginPresenter

  private constructor(
    private readonly expenseSparkGateway: ExpenseSparksGateway
  ) {
    //this.loginPresenter = new LoginPresenter
  }

  public static create(
    expenseSparkGateway: ExpenseSparksGateway
  ): ExpenseSparkTotalUseCase {
    return new ExpenseSparkTotalUseCase(expenseSparkGateway);
  }

  public async execute(input: ExpenseSparkTotalInputDto): Promise<ExpenseSparkTotalOutputDto> {
    const totalFromDB = await this.expenseSparkGateway.sparkTotal(input);
  
    const output: ExpenseSparkTotalOutputDto = {
      total: {
        value: totalFromDB.total.value,
        values: totalFromDB.total.values
      },
      balanco: {
        value: totalFromDB.balanco.value,
        values: totalFromDB.balanco.values
      },
      pago: {
        value: totalFromDB.pago.value,
        values: totalFromDB.pago.values
      },
      pendente: {
        value: totalFromDB.pendente.value,
        values: totalFromDB.pendente.values
      }
    }

    return output

    //return this.loginPresenter.login(output);
  }
}