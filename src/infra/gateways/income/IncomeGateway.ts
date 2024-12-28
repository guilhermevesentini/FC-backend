import { GetIncomeInputDto, GetIncomeOutputDto, IncomeDto, IncomeOutputDto } from "../../../application/dtos/IncomeDto";

export interface IncomeGateway {
  create(expense: IncomeDto): Promise<void>
  get(input: GetIncomeInputDto): Promise<IncomeDto[]>
  edit(income: IncomeDto): Promise<void>
  delete(customerId: string, id: string, mes?: number): Promise<void>
}