import { ExpenseMonthDto } from '../../../application/dtos/expenses/expensesDto';
import { ExpenseModelInputDto } from '../../interfaces/IExpense';

export class ExpenseBuilder {
  private buildMonth(input: ExpenseModelInputDto, month: number, year: number): ExpenseMonthDto {
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
      vencimento: new Date(year, month - 1, day),
      customerId: input.customerId,
      despesaId: input.id,
    }

    return Data
  }
  
  public set(input: ExpenseModelInputDto): ExpenseMonthDto[] {
    const { vencimento, recorrente, replicar } = input;

    const months: ExpenseMonthDto[] = [];

   const currentDate = new Date(vencimento); // Data original
    const currentYear = currentDate.getUTCFullYear(); // Ano em UTC
    const startMonth = currentDate.getUTCMonth() + 1;

    if (replicar && recorrente === '1') {
      

      for (let month = 1; month <= 12; month++) {
        const day = currentDate.getUTCDate()
        const newDate =  new Date(currentYear, month - 1, day)
        months.push(this.buildMonth({ ...input, vencimento: newDate }, month, currentYear));
      }

      return months;
    }

    if (recorrente === '1') {
      for (let month = startMonth; month <= 12; month++) {
        months.push(this.buildMonth(input, month, currentYear));
      }
    } else if (recorrente === '2') {
      months.push(this.buildMonth(input, startMonth, currentYear));
    }

    return months;
  }
}
