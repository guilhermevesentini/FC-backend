import { ExpenseMonth } from "../../../domain/expenses/entity/expenseMonth";
import { ExpenseMonthGateway } from "../../../domain/expenses/gateway/ExpenseMonthGateway";
import { UseCase } from "../../usercase"

export type CreateExpenseMonthInputDto = {
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

export type CreateExpenseMonthOutputDto = {
  id: string
  mes: number
  ano: number
  despesaId: string
  valor: string
  status: string
  descricao: string  
  customerId: string
  vencimento: Date;
  observacao: string
};

export class CreateExpenseMonthUseCase implements UseCase<CreateExpenseMonthInputDto[], CreateExpenseMonthOutputDto[]>{
  private constructor(
    private readonly expenseMonthGateway: ExpenseMonthGateway
  ) {}

  public static create(
    expenseMonthGateway: ExpenseMonthGateway
  ): CreateExpenseMonthUseCase {
    return new CreateExpenseMonthUseCase(expenseMonthGateway);
  }

  public async execute(mes: CreateExpenseMonthOutputDto[], customerId: string, despesaId: string): Promise<CreateExpenseMonthOutputDto[]> {
    const aMonth = await Promise.all(
      mes.map(async (m) => {
        return await ExpenseMonth.create({...m, customerId: customerId, despesaId: despesaId});
      })
    );

    await this.expenseMonthGateway.create(aMonth)

    const output: CreateExpenseMonthOutputDto[] = aMonth.map((m) => this.presentOutput(m))

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