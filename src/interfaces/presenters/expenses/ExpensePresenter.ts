import { ExpenseDto } from "../../../application/dtos/expensesDto";

export class ExpensePresenter {
  public expense(input: ExpenseDto): ExpenseDto {
    return {
      id: input.id,
      customerId: input.customerId,
      vencimento: input.vencimento,
      nome: input.nome,
      replicar: input.replicar,
      tipoLancamento: input.tipoLancamento,
      meses: input.meses,
      range: {
        inicio: input.range?.inicio,
        fim: input.range?.fim
      }
    }
  }
}
