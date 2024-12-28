import { Income } from "../../../domain/entities/income/income";
import { IncomeGateway } from "../../../infra/gateways/income/IncomeGateway";
import { IncomeDto, IncomeInputDto } from "../../dtos/IncomeDto";
import { UseCase } from "../UseCase";

export class EditIncomeUseCase implements UseCase<IncomeInputDto, IncomeDto> {
  private constructor(private readonly incomeGateway: IncomeGateway) {}

  public static create(incomeGateway: IncomeGateway): EditIncomeUseCase {
    return new EditIncomeUseCase(incomeGateway);
  }

  public async execute(input: IncomeInputDto, customerId?: string): Promise<IncomeDto> {

    if (input.replicar) {//ainda nao foi feito essa parte
      const aIncome = Income.create(input);
      
      //await this.incomeGateway.editAll(input, customerId!);  
      
      return this.presentOutput(aIncome);
    } else {
      const incomeSingle = Income.create(input);

      await this.incomeGateway.edit(input);  

      return this.presentOutput(incomeSingle);
    }
  }

  private presentOutput(income: IncomeDto): IncomeDto {
    return {
      id: income.id,
      customerId: income.customerId,
      recebimento: income.recebimento,
      tipoLancamento: income.tipoLancamento,
      range: {
        inicio: income.range?.inicio,
        fim: income.range?.fim
      },
      nome: income.nome,
      replicar: income.replicar,
      meses: income.meses,
    };
  }
}
