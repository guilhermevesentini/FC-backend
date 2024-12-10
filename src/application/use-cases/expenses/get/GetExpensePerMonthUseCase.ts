import { ExpensePerMonthOutputDto, GetExpensePerMonthInputDto } from "../../../../domain/interfaces/IExpense";
import { ExpenseGateway } from "../../../../infra/gateways/expenses/ExpenseGateway";
import { UseCase } from "../../UseCase";

export class GetExpensePerMonthCase implements UseCase<GetExpensePerMonthInputDto, ExpensePerMonthOutputDto[]>{
  private constructor(
    private readonly expenseGateway: ExpenseGateway
  ) {}

  public static create(
    expenseGateway: ExpenseGateway
  ): GetExpensePerMonthCase {
    return new GetExpensePerMonthCase(expenseGateway);
  }

  public async execute(input: GetExpensePerMonthInputDto): Promise<ExpensePerMonthOutputDto[]> {
    const months = await this.expenseGateway.getExpensePerMonth(input.mes, input.ano, input.customerId);

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