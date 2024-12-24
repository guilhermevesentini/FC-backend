import { Income } from "../../../domain/entities/income/income";
import { IncomeGateway } from "../../../infra/gateways/income/IncomeGateway";
import { IncomeDto, IncomeInputDto } from "../../dtos/IncomeDto";
import { UseCase } from "../UseCase";

export class CreateIncomeUseCase implements UseCase<IncomeInputDto, void>{
  //private expensePresenter: ExpensePresenter

  private constructor(
    private readonly incomeGateway: IncomeGateway
  ) {
    //this.expensePresenter = new ExpensePresenter    
  }

  public static create(
    incomeGateway: IncomeGateway
  ): CreateIncomeUseCase {
    return new CreateIncomeUseCase(incomeGateway);
  }

  public async execute(income: IncomeInputDto): Promise<void> {
    const aIncome = Income.create(income);

    await this.incomeGateway.create(aIncome)
  }
}