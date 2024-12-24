import { GetIncomeInputDto, GetIncomeOutputDto, IncomeDto, IncomeOutputDto } from "../../../application/dtos/IncomeDto";

export interface IncomeGateway {
  create(expense: IncomeDto): Promise<void>
  get(input: GetIncomeInputDto): Promise<IncomeDto[]>
}