import { ETipoOptions } from "../../../@types/enums";
import { Income } from "../../../domain/entities/income/income";
import { IIncomeCreateInstallmentsStratregy, IncomeCreateInstallmentsStratregy } from "../../../domain/factories/income/create/strategies/IncomeCreateinstallmentsStrategy";
import { IIncomeCreateMonthStrategy, IncomeCreateMonthStrategy } from "../../../domain/factories/income/create/strategies/IncomeCreateMonthStrategy";
import { IIncomeCreateRecurringMonthsStratregy, IncomeCreateRecurringMonthsStratregy } from "../../../domain/factories/income/create/strategies/IncomeCreateRecurringMonthsStratregy";
import { IncomeGateway } from "../../../infra/gateways/income/IncomeGateway";
import { IncomeDto, IncomeInputDto, IncomeMonthDto } from "../../dtos/IncomeDto";
import { UseCase } from "../UseCase";

export class CreateIncomeUseCase implements UseCase<IncomeInputDto, IncomeDto>{
  private createRecurring: IIncomeCreateRecurringMonthsStratregy;
  private createMonth: IIncomeCreateMonthStrategy;
  private createInstallments: IIncomeCreateInstallmentsStratregy;

  private constructor(
    private readonly incomeGateway: IncomeGateway
  ) {
    this.createRecurring = new IncomeCreateRecurringMonthsStratregy(),
      this.createMonth = new IncomeCreateMonthStrategy(),
      this.createInstallments = new IncomeCreateInstallmentsStratregy()
  }

  public static create(
    incomeGateway: IncomeGateway
  ): CreateIncomeUseCase {
    return new CreateIncomeUseCase(incomeGateway);
  }

  public async execute(income: IncomeInputDto): Promise<IncomeDto> {

    let strategy: IncomeDto;
    let months: IncomeMonthDto[];

    if (income.tipoLancamento == ETipoOptions.recorrente) {//tratar aqui a seleção de range
      months = this.createRecurring.create(income);
    } else if (income.tipoLancamento == ETipoOptions.parcelado){
      months = this.createInstallments.create(income);
    } else {
       months = [this.createMonth.create(income)];
    }

    strategy = {
      id: income.id,
      recebimento: income.recebimento,
      replicar: income.replicar,
      tipoLancamento: income.tipoLancamento,
      range: {
        inicio: income.range?.inicio || undefined,
        fim: income.range?.fim || undefined
      },
      nome: income.nome,
      customerId: income.customerId,
      meses: months
    }

    const incomeOutput =  Income.create(strategy);

    await this.incomeGateway.create(incomeOutput)
    
    return incomeOutput
  }
}