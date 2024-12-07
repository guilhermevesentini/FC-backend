import { CreateExpenseMonthInputDto, CreateExpenseMonthOutputDto } from "../../../domain/_interfaces/IExpense";
import { ExpenseMonth } from "../../../domain/expenses/entity/expenseMonth";
import { ExpenseGateway } from "../../../domain/expenses/gateway/ExpenseGateway";
import { UseCase } from "../../usercase"

export class CreateExpenseMonthUseCase implements UseCase<CreateExpenseMonthInputDto[], CreateExpenseMonthOutputDto[]>{
  private constructor(
    private readonly expenseGateway: ExpenseGateway
  ) {}

  public static create(
    expenseGateway: ExpenseGateway
  ): CreateExpenseMonthUseCase {
    return new CreateExpenseMonthUseCase(expenseGateway);
  }

  public async execute(mes: CreateExpenseMonthOutputDto[], customerId: string, despesaId: string): Promise<CreateExpenseMonthOutputDto[]> {
    const aMonth = await Promise.all(
      mes.map(async (m) => {
        return await ExpenseMonth.create({...m, customerId: customerId, despesaId: despesaId});
      })
    );

    await this.expenseGateway.createMonth(aMonth)

    const output: CreateExpenseMonthOutputDto[] = aMonth.map((m: CreateExpenseMonthOutputDto) => this.presentOutput(m))

    return output
  }  

  private presentOutput(expense: CreateExpenseMonthOutputDto): CreateExpenseMonthOutputDto {
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
    }
  }
}