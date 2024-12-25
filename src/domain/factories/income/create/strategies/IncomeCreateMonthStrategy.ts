import { IncomeInputDto, IncomeMonthDto } from "../../../../../application/dtos/IncomeDto";

export interface IIncomeCreateMonthStrategy {
  create(input: IncomeInputDto): IncomeMonthDto
}

export class IncomeCreateMonthStrategy implements IIncomeCreateMonthStrategy {
  public create(input: IncomeInputDto): IncomeMonthDto {
    return {
      id: input.id,
      mes: input.mes + 1,
      ano: input.ano,
      valor: input.valor,
      status: input.status,
      descricao: input.descricao,
      incomeId: input.id,
      categoria: input.categoria,
      customerId: input.customerId,
      recebimento: input.recebimento,
      observacao: input.observacao,
      contaId: input.contaId
    };
  }
}