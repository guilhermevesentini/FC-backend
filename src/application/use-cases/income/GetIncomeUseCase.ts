import { IncomeGateway } from "../../../infra/gateways/income/IncomeGateway";
import { GetIncomeInputDto, IncomeDto } from "../../dtos/IncomeDto";
import { UseCase } from "../UseCase";

export class GetIncomeUseCase implements UseCase<GetIncomeInputDto, IncomeDto[]>{
  private constructor(
    private readonly incomeGateway: IncomeGateway
  ) {}

  public static create(
    incomeGateway: IncomeGateway
  ): GetIncomeUseCase {
    return new GetIncomeUseCase(incomeGateway);
  }

  public async execute(input: GetIncomeInputDto): Promise<IncomeDto[]> {
    return await this.incomeGateway.get(input.mes, input.ano, input.customerId)
  }
}