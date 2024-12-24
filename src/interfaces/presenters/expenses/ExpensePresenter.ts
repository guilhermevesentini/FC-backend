import { ExpenseDto } from "../../../application/dtos/expensesDto";

export class ExpensePresenter {
  public expense(input: ExpenseDto): ExpenseDto {
    return {
      id: input.id,
      customerId: input.customerId,
      vencimento: input.vencimento,
      frequencia: input.frequencia,
      nome: input.nome,
      recorrente: input.recorrente,
      replicar: input.replicar
    }
  }
}
