import { IncomeDto, IncomeInputDto, IncomeMonthDto, IncomeOutputDto } from "../../../application/dtos/IncomeDto";
import { IncomeBuilder } from "./incomeBuilder";

export class Income {
  protected incomeBuilder: IncomeBuilder;
  
  constructor(
    private props: IncomeDto
  ) {
    this.incomeBuilder = new IncomeBuilder()
  }

  public static create(input: IncomeInputDto): IncomeDto {
    const months = input.replicar ? this.createMonths(input) : [this.createMonth(input, input.id)];

    const props: IncomeDto = {
      id: input.id,
      nome: input.nome,
      recorrente: input.recorrente,
      recebimento: input.recebimento,
      frequencia: input.frequencia,
      replicar: input.replicar,
      customerId: input.customerId,
      meses: input.id == '' ? this.createMonths(input) : months
      //meses: [this.createMonth(input, input.id)]
    };

    return props;
  }

  public static createMonth(input: IncomeInputDto, id: string): IncomeMonthDto {
    return {
      id: input.id,
      mes: input.mes + 1,
      ano: input.ano,
      valor: input.valor,
      status: input.status,
      descricao: input.descricao,
      incomeId: id,
      categoria: input.categoria,
      customerId: input.customerId,
      recebimento: input.recebimento,
      observacao: input.observacao,
      contaId: input.contaId
    };
  }

   private static createMonths(input: IncomeInputDto): any {
      // Gera múltiplos meses com base na lógica de replicação
      const months = new IncomeBuilder().set(input);
      return months
    }

  public static with(props: IncomeDto): IncomeDto {
    return props;
  }

  public get expense() {
    return this.props;
  }
}