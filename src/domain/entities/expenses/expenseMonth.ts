import { ExpenseMonthDto } from "../../../application/dtos/expenses/expensesDto";

export class ExpenseMonth {
  constructor(
    private props: ExpenseMonthDto
  ){}

  public static async create(input: ExpenseMonthDto): Promise<ExpenseMonthDto> {
    const expenses = {
      id: input.id,
      mes: input.mes,
      ano: input.ano,
      valor: input.valor,
      status: input.status,
      descricao: input.descricao,
      despesaId: input.despesaId,
      customerId: input.customerId,
      vencimento: input.vencimento,
      observacao: input.observacao,
    };

    return expenses;
  }

  public get expenseMonth() {
    return this.props;
  }
}