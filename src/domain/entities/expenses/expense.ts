import { ExpenseDto } from "../../../application/dtos/expenses/expensesDto";
import { ExpenseModelInputDto } from "../../interfaces/IExpense";
import { ExpenseBuilder } from "./expenseBuilder";

export class Expense {
  protected expenseBuilder: ExpenseBuilder;
  
  constructor(
    private props: ExpenseDto
  ) {
    this.expenseBuilder = new ExpenseBuilder()
  }

  public static create(input: ExpenseModelInputDto): ExpenseDto {
    const months = input.replicar ? this.createMonths(input) : [this.createMonth(input, input.id)];

    const props: ExpenseDto = {
      id: input.id,
      nome: input.nome,
      recorrente: input.recorrente,
      vencimento: input.vencimento,
      frequencia: input.frequencia,
      replicar: input.replicar,
      customerId: input.customerId,
      meses: input.id == '' ? this.createMonths(input) : months
    };

    return props;
  }

  public static createMonth(input: ExpenseModelInputDto, id: string): ExpenseModelInputDto {
    return {
      id: input.id,
      mes: input.mes,
      ano: input.ano,
      valor: input.valor,
      status: input.status,
      descricao: input.descricao,
      despesaId: id,
      categoria: input.categoria,
      customerId: input.customerId,
      vencimento: input.vencimento,
      observacao: input.observacao,
      frequencia: input.frequencia,
      nome: input.nome,
      recorrente: input.recorrente,
      replicar: input.replicar
    };
  }

  private static createMonths(input: ExpenseModelInputDto): any {
    // Gera múltiplos meses com base na lógica de replicação
    const months = new ExpenseBuilder().set(input);
    return months
  }

  public static with(props: ExpenseDto): ExpenseDto {
    return props;
  }

  public get expense() {
    return this.props;
  }
}