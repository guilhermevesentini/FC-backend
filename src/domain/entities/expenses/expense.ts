import { ExpenseDto, ExpenseMonthDto } from "../../../application/dtos/expenses/expensesDto";

export class Expense {
  constructor(
    private props: ExpenseDto
  ){}

  public static async create(input: ExpenseDto): Promise<ExpenseDto> {
    const props: ExpenseDto = {
      id: input.id,
      nome: input.nome,
      recorrente: input.recorrente,
      vencimento: input.vencimento,
      frequencia: input.frequencia,
      replicar: input.replicar,
      customerId: input.customerId,
      meses: input.meses && this.addMonths(input.meses, input.id)
    };

    return props;
  }

  public static createMonth(input: ExpenseMonthDto, id: string): ExpenseMonthDto {
    return {
      id: input.id,
      mes: input.mes,
      ano: input.ano,
      valor: input.valor,
      status: input.status,
      descricao: input.descricao,
      despesaId: id,
      customerId: input.customerId,
      vencimento: input.vencimento,
      observacao: input.observacao,
    }
  }

  public static addMonths(input: ExpenseMonthDto[], id: string): ExpenseMonthDto[] {
    return input.map((mes) => ({
      id: mes.id,
      mes: mes.mes,
      ano: mes.ano,
      valor: mes.valor,
      status: mes.status,
      descricao: mes.descricao,
      despesaId: id,
      customerId: mes.customerId,
      vencimento: mes.vencimento,
      observacao: mes.observacao,
    }))
  }

  
  public static with(props: ExpenseDto): ExpenseDto {
    return props;
  }

  public get expense() {
    return this.props;
  }
}