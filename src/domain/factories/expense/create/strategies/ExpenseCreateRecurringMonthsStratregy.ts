import { ETipoOptions } from "../../../../../@types/enums";
import { ExpenseInputDto, ExpenseMonthDto } from "../../../../../application/dtos/expensesDto";

export interface IExpenseCreateRecurringMonthsStratregy {
  create(input: ExpenseInputDto): ExpenseMonthDto[]
}

export class ExpenseCreateRecurringMonthsStratregy implements IExpenseCreateRecurringMonthsStratregy {
 
  private buildMonth(input: ExpenseInputDto, month: number, year: number): ExpenseMonthDto {
    const originalDate = new Date(input.vencimento);
    const day = originalDate.getUTCDate();
    
    const Data = {
      id: input.id,
      ano: year,
      mes: month,
      valor: input.valor,
      descricao: input.descricao,
      observacao: input.observacao,
      status: input.status,
      despesaId: input.despesaId,
      vencimento: new Date(year, month - 1, day),
      customerId: input.customerId,
      categoria: input.categoria,
      incomeId: input.id,
      contaId: input.contaId
    }

    return Data
  }
  
  public create(input: ExpenseInputDto): ExpenseMonthDto[] {
    const { vencimento, replicar, tipoLancamento } = input;

    const months: ExpenseMonthDto[] = [];

   const currentDate = new Date(vencimento);
    const currentYear = currentDate.getUTCFullYear();
    const startMonth = currentDate.getUTCMonth() + 1;

    if (replicar && tipoLancamento === ETipoOptions.recorrente) {
      for (let month = 1; month <= 12; month++) {
        const day = currentDate.getUTCDate()
        const newDate =  new Date(currentYear, month - 1, day)
        months.push(this.buildMonth({ ...input, vencimento: newDate }, month, currentYear));
      }

      return months;
    }

    if (tipoLancamento === ETipoOptions.recorrente) {//tratar recorrente
      for (let month = startMonth; month <= 12; month++) {
        months.push(this.buildMonth(input, month, currentYear));
      }
    } else if (tipoLancamento === ETipoOptions.unicio) {
      months.push(this.buildMonth(input, startMonth, currentYear));
    }

    return months;
  }
}