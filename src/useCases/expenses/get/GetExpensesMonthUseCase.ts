import { ExpenseMonthOutputDto, GetExpenseMonthInputDto } from "../../../domain/_interfaces/IExpense";
import { ExpenseGateway } from "../../../domain/expenses/gateway/ExpenseGateway";
import { UseCase } from "../../usercase";

export class GetExpenseMonthUseCase implements UseCase<GetExpenseMonthInputDto, ExpenseMonthOutputDto[]>{
  private constructor(
    private readonly expenseGateway: ExpenseGateway
  ) {}

  public static create(
    expenseGateway: ExpenseGateway
  ): GetExpenseMonthUseCase {
    return new GetExpenseMonthUseCase(expenseGateway);
  }

  public async execute(input: GetExpenseMonthInputDto): Promise<ExpenseMonthOutputDto[]> {
    const months = await this.expenseGateway.findByMonthYearAndCustomer(input.mes, input.ano, input.customerId);

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