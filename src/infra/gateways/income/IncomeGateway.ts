import { GetIncomeInputDto, IncomeDto, IncomeMonthDto } from "../../../application/dtos/IncomeDto";

export interface IncomeGateway {
  create(expense: IncomeDto, monthsData: IncomeMonthDto[]): Promise<IncomeDto>
  get(mes: number, ano: number, customerId: string): Promise<IncomeDto[]>
  edit(income: IncomeDto): Promise<void>
  delete(customerId: string, id: string, mes?: number): Promise<void>
}