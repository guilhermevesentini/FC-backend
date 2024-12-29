import { ETipoOptions } from "../../../../../@types/enums";
import { IncomeInputDto, IncomeMonthDto } from "../../../../../application/dtos/IncomeDto";

export interface IIncomeCreateInstallmentsStratregy {
  create(input: IncomeInputDto): IncomeMonthDto[]
}

export class IncomeCreateInstallmentsStratregy implements IIncomeCreateInstallmentsStratregy {
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
      incomeId: input.incomeId,
      recebimento: new Date(year, month - 1, day),
      customerId: input.customerId,
      categoria: input.categoria,
      contaId: input.contaId
    }
 
    return Data
  }
 
  public create(input: IncomeInputDto): IncomeMonthDto[] {
    const months: IncomeMonthDto[] = [];
    
    if (!Array.isArray(input.range)) {
      throw Error('Obrigatório selecionar o range')
    }

    const startDate = new Date(input.range[0]);
    const endDate = new Date(input.range[1]);

    const firstMonth = startDate.getMonth() + 1
    const endMonth = endDate.getMonth() + 1

    const currentYear = startDate.getFullYear()

    for (let month = firstMonth; month <= endMonth; month++) {
      const day = startDate.getUTCDate()
      const newDate = new Date(currentYear, month - 1, day)      
      months.push(this.buildMonth({ ...input, recebimento: newDate }, month, currentYear));
    }

    return months;
  }
}