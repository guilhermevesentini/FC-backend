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
    const { vencimento, recorrente } = input;

    const months: ExpenseMonthDto[] = [];

   const currentDate = new Date(vencimento); // Data original
    const currentYear = currentDate.getUTCFullYear(); // Ano em UTC
    const startMonth = currentDate.getUTCMonth() + 1;

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
