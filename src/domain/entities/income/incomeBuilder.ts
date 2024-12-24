import { ExpenseMonthDto } from '../../../application/dtos/expensesDto';
import { IncomeInputDto, IncomeMonthDto } from '../../../application/dtos/IncomeDto';
import { ExpenseModelInputDto } from '../../interfaces/IExpense';

export class IncomeBuilder {
  private buildMonth(input: IncomeInputDto, month: number, year: number): IncomeMonthDto {
    const originalDate = new Date(input.recebimento);
    const day = originalDate.getUTCDate();
    
    const Data = {
      id: input.id,
      ano: year,
      mes: month,
      valor: input.valor,
      descricao: input.descricao,
      observacao: input.observacao,
      status: input.status,
      recebimento: new Date(year, month - 1, day),
      customerId: input.customerId,
      categoria: input.categoria,
      incomeId: input.id,
      contaId: input.contaId
    }

    return Data
  }
  
  public set(input: IncomeInputDto): IncomeMonthDto[] {
    const { recebimento, recorrente, replicar } = input;

    const months: IncomeMonthDto[] = [];

   const currentDate = new Date(recebimento); // Data original
    const currentYear = currentDate.getUTCFullYear(); // Ano em UTC
    const startMonth = currentDate.getUTCMonth() + 1;

    if (replicar && recorrente === '1') {
      

      for (let month = 1; month <= 12; month++) {
        const day = currentDate.getUTCDate()
        const newDate =  new Date(currentYear, month - 1, day)
        months.push(this.buildMonth({ ...input, recebimento: newDate }, month, currentYear));
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
