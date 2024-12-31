import { ExpenseInputDto, ExpenseMonthDto } from "../../../../../application/dtos/expensesDto";

export interface IExpenseCreateMonthStrategy {
  create(input: ExpenseInputDto): ExpenseMonthDto
}

export class ExpenseCreateMonthStrategy implements IExpenseCreateMonthStrategy {
  public create(input: ExpenseInputDto): ExpenseMonthDto {
    return {
      id: input.id,
      mes: input.mes,
      ano: input.ano,
      valor: input.valor,
      status: input.status,
      descricao: input.descricao,
      despesaId: input.id,
      categoria: input.categoria,
      customerId: input.customerId,
      vencimento: input.vencimento,
      observacao: input.observacao,
      contaId: input.contaId
    };
  }
}