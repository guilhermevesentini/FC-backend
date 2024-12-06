import { ExpenseMonthGateway } from "../../../domain/expenses/gateway/ExpenseMonthGateway";
import { ExpensePerMonthGateway } from "../../../domain/expenses/gateway/ExpensePerMonthGateway";
import { UseCase } from "../../usercase";

export type GetExpensePerMonthInputDto = {
  mes: number
  ano: number
  customerId: string
};

export type ExpensePerMonthOutputDto = {
  id: string;
  nome: string;
  recorrente: string
  vencimento: Date
  frequencia: string
  replicar: boolean
  customerId: string
  meses: ExpensePerMonthResponseDto[];
};

export type ExpensePerMonthResponseDto = {
  id: string
  mes: number
  ano: number
  valor: string
  status: string
  despesaId: string
  descricao: string  
  customerId: string
  vencimento: Date;
  observacao: string
}

export class GetExpensePerMonthCase implements UseCase<GetExpensePerMonthInputDto, ExpensePerMonthOutputDto[]>{
  private constructor(
    private readonly expensePerMonthGateway: ExpensePerMonthGateway
  ) {}

  public static create(
    expensePerMonthGateway: ExpensePerMonthGateway
  ): GetExpensePerMonthCase {
    return new GetExpensePerMonthCase(expensePerMonthGateway);
  }

  public async execute(input: GetExpensePerMonthInputDto): Promise<ExpensePerMonthOutputDto[]> {
    const months = await this.expensePerMonthGateway.getExpensePerMonth(input.mes, input.ano, input.customerId);

    const output: ExpensePerMonthOutputDto[] = months.map(expense => ({
      id: expense.id,
      nome: expense.nome,
      customerId: expense.customerId,
      frequencia: expense.frequencia,
      recorrente: expense.recorrente,
      replicar: expense.replicar,
      vencimento: expense.vencimento,
      meses: expense.meses,
    }));

    return output.map((expense) => this.presentOutput(expense));
  }  

  private presentOutput(input: ExpensePerMonthOutputDto): ExpensePerMonthOutputDto { 
    return {
      id: input.id,
      nome: input.nome,
      customerId: input.customerId,
      frequencia: input.frequencia,
      recorrente: input.recorrente,
      replicar: input.replicar,
      vencimento: input.vencimento,
      meses: input.meses,
    };
  }
}