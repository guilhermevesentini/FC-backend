import { ExpenseDonutGateway } from "../../../../../infra/gateways/expenses/overview/ExpenseDonutGateway";
import { UseCase } from "../../../UseCase";
import { ExpenseDonuOutputDto, ExpenseDonutInputDto } from "./ExpenseDonutUseCaseDto";

export class ExpenseDonutUseCase implements UseCase<ExpenseDonutInputDto, ExpenseDonuOutputDto> {
  private constructor(
      private readonly expenseDonutGateway: ExpenseDonutGateway
    ) {
      //this.loginPresenter = new LoginPresenter
    }
  
    public static create(
      expenseDonutGateway: ExpenseDonutGateway
    ): ExpenseDonutUseCase {
      return new ExpenseDonutUseCase(expenseDonutGateway);
  }
  
  public async execute(input: ExpenseDonutInputDto): Promise<ExpenseDonuOutputDto> {
      const donutFromDB = await this.expenseDonutGateway.donutTotal(input);
    
      const output: ExpenseDonuOutputDto = {
        labels: donutFromDB.labels,
        values: donutFromDB.values
      }
  
      return output
  
      //return this.loginPresenter.login(output);
    }
}