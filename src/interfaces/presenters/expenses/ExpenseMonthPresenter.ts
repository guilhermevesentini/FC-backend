import { ExpenseMonthDto } from "../../../application/dtos/expensesDto";

export class ExpenseMonthPresenter {
  public month(input: ExpenseMonthDto): ExpenseMonthDto {
    return {
      id: input.id,
      vencimento: input.vencimento,
      ano: input.ano,
      customerId: input.customerId,
      descricao: input.descricao,
      contaId: input.contaId,
      despesaId: input.despesaId,
      categoria: input.categoria,
      mes: input.mes,
      observacao: input.observacao,
      status: input.status,
      valor: input.valor
    }
  }
}
