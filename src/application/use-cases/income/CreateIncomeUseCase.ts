import { Income } from "../../../domain/entities/income/income";
import { IIncomeCreateMonthStrategy, IncomeCreateMonthStrategy } from "../../../domain/factories/income/create/strategies/IncomeCreateMonthStrategy";
import { IIncomeCreateRecurringMonthsStratregy, IncomeCreateRecurringMonthsStratregy } from "../../../domain/factories/income/create/strategies/IncomeCreateRecurringMonthsStratregy";
import { IncomeGateway } from "../../../infra/gateways/income/IncomeGateway";
import { IncomeDto, IncomeInputDto, IncomeMonthDto } from "../../dtos/IncomeDto";
import { UseCase } from "../UseCase";

export class CreateIncomeUseCase implements UseCase<IncomeInputDto, IncomeDto>{
  private createRecurring: IIncomeCreateRecurringMonthsStratregy;
  private createMonth: IIncomeCreateMonthStrategy;

  private constructor(
    private readonly incomeGateway: IncomeGateway
  ) {
    this.createRecurring = new IncomeCreateRecurringMonthsStratregy(),
    this.createMonth = new IncomeCreateMonthStrategy()
  }

  public static create(
    incomeGateway: IncomeGateway
  ): CreateIncomeUseCase {
    return new CreateIncomeUseCase(incomeGateway);
  }

  public async execute(income: IncomeInputDto): Promise<IncomeDto> {

    let strategy: IncomeDto;
    let months: IncomeMonthDto[];

    if (income.recorrente == '1') {
      months = this.createRecurring.create(income);
    } else {
      months = [this.createMonth.create(income)];
    }

    strategy = {
      id: income.id,
      frequencia: income.frequencia,
      recebimento: income.recebimento,
      replicar: income.replicar,
      recorrente: income.recorrente,
      nome: income.nome,
      customerId: income.customerId,
      meses: months
    }

    const incomeOutput =  Income.create(strategy);

    await this.incomeGateway.create(incomeOutput)
    
    return incomeOutput
  }
}