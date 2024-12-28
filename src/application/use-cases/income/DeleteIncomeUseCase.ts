import { IncomeGateway } from "../../../infra/gateways/income/IncomeGateway";
import { DeleteIncomeInputDto } from "../../dtos/IncomeDto";
import { UseCase } from "../UseCase";


export class DeleteIncomeUseCase implements UseCase<DeleteIncomeInputDto, void>{
  private constructor(
    private readonly incomeGateway: IncomeGateway
  ) {}

  public static create(
    incomeGateway: IncomeGateway
  ): DeleteIncomeUseCase {
    return new DeleteIncomeUseCase(incomeGateway);
  }

  public async execute(income: DeleteIncomeInputDto): Promise<void> {
    await this.incomeGateway.delete(income.customerId, income.id, income.mes)
  }
}