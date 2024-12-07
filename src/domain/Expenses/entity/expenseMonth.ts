import { CreateExpenseMonthOutputDto, ExpenseMonthOutputDto } from "../../_interfaces/IExpense";

export class ExpenseMonth {
  constructor(
    private props: CreateExpenseMonthOutputDto
  ){}

  public static async create(input: CreateExpenseMonthOutputDto): Promise<CreateExpenseMonthOutputDto> {
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

  public static with(props: CreateExpenseMonthOutputDto): ExpenseMonthOutputDto {
    return {
      id: props.id,
      mes: props.mes,
      despesaId: props.despesaId,
      ano: props.ano,
      valor: props.valor,
      status: props.status,
      descricao: props.descricao,
      customerId: props.customerId,
      vencimento: props.vencimento,
      observacao: props.observacao,
    }
  }

  public get expenseMonth() {
    return this.props;
  }
}