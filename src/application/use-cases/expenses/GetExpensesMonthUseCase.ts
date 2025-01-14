import { ExpenseGateway } from "../../../infra/gateways/expenses/ExpenseGateway";
import { ExpenseDto, ExpenseMonthDto, GetExpenseMonthInputDto } from "../../dtos/expensesDto";
import { UseCase } from "../UseCase";

export class GetExpenseMonthUseCase implements UseCase<GetExpenseMonthInputDto, ExpenseDto[]>{
  private constructor(
    private readonly expenseGateway: ExpenseGateway
  ) {}

  public static create(
    expenseGateway: ExpenseGateway
  ): GetExpenseMonthUseCase {
    return new GetExpenseMonthUseCase(expenseGateway);
  }

  public async execute(input: GetExpenseMonthInputDto): Promise<ExpenseDto[]> {
    const months = await this.expenseGateway.get(input.mes, input.ano, input.customerId);

    return months
    // const output: ExpenseDto[] = 

    // return output.map((expense) => this.presentOutput(expense));
  }  

  private presentOutput(expense: ExpenseMonthDto): ExpenseMonthDto { 
    return {
      id: expense.id,
      mes: expense.mes,
      categoria: expense.categoria,
      despesaId: expense.despesaId,
      ano: expense.ano,
      valor: expense.valor,
      status: expense.status,
      descricao: expense.descricao,
      customerId: expense.customerId,
      vencimento: expense.vencimento,
      observacao: expense.observacao,
      contaId: expense.contaId
    };
  }
}