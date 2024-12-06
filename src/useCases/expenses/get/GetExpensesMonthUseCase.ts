import { ExpenseMonthGateway } from "../../../domain/expenses/gateway/ExpenseMonthGateway";
import { UseCase } from "../../usercase";

export type GetExpenseMonthInputDto = {
  mes: number
  ano: number
  customerId: string
};

export type ExpenseMonthOutputDto = {
  id: string
  mes: number
  despesaId: string
  ano: number
  valor: string
  status: string
  descricao: string  
  customerId: string
  vencimento: Date;
  observacao: string
};

export class GetExpenseMonthUseCase implements UseCase<GetExpenseMonthInputDto, ExpenseMonthOutputDto[]>{
  private constructor(
    private readonly expenseMonthGateway: ExpenseMonthGateway
  ) {}

  public static create(
    expenseMonthGateway: ExpenseMonthGateway
  ): GetExpenseMonthUseCase {
    return new GetExpenseMonthUseCase(expenseMonthGateway);
  }

  public async execute(input: GetExpenseMonthInputDto): Promise<ExpenseMonthOutputDto[]> {
    const months = await this.expenseMonthGateway.findByMonthYearAndCustomer(input.mes, input.ano, input.customerId);

    const output: ExpenseMonthOutputDto[] = months.map(mes => ({
      id: mes.id,
      mes: mes.mes,
      despesaId: mes.despesaId,
      ano: mes.ano,
      valor: mes.valor,
      status: mes.status,
      descricao: mes.descricao,
      customerId: mes.customerId,
      vencimento: mes.vencimento,
      observacao: mes.observacao
    }));

    return output.map((expense) => this.presentOutput(expense));
  }  

  private presentOutput(expense: ExpenseMonthOutputDto): ExpenseMonthOutputDto { 
    return {
      id: expense.id,
      mes: expense.mes,
      despesaId: expense.despesaId,
      ano: expense.ano,
      valor: expense.valor,
      status: expense.status,
      descricao: expense.descricao,
      customerId: expense.customerId,
      vencimento: expense.vencimento,
      observacao: expense.observacao,
    };
  }
}