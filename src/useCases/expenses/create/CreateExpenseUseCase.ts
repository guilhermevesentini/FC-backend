import { Expense } from "../../../domain/expenses/entity/expense";
import { ExpenseGateway } from "../../../domain/expenses/gateway/ExpenseGateway";
import { UseCase } from "../../usercase"
import { CreateExpenseMonthInputDto } from "./CreateExpenseMonthUseCase";

export type CreateExpenseInputDto = {
  id: string;
  nome: string;
  recorrente: string
  vencimento: Date
  frequencia: string
  replicar: boolean
  customerId: string
  meses?: CreateExpenseMonthInputDto[];
};

export type CreateExpenseOutputDto = {
  id: string;
  nome: string;
  recorrente: string
  vencimento: Date
  frequencia: string
  replicar: boolean
  customerId: string
};

export class CreateExpenseUseCase implements UseCase<CreateExpenseInputDto, CreateExpenseOutputDto>{
  private constructor(
    private readonly expenseGateway: ExpenseGateway
  ) {}

  public static create(
    expenseGateway: ExpenseGateway
  ): CreateExpenseUseCase {
    return new CreateExpenseUseCase(expenseGateway);
  }

  public async execute(expense: CreateExpenseInputDto): Promise<CreateExpenseOutputDto> {
    const aExpense = await Expense.create(expense);

    const response = await this.expenseGateway.create(aExpense)

    const output: CreateExpenseOutputDto = this.presentOutput(response)

    return output
  }  

  private presentOutput(expense: Expense): CreateExpenseOutputDto {
    const output: CreateExpenseOutputDto = {
      id: expense.expense.id,
      customerId: expense.expense.customerId,
      vencimento: expense.expense.vencimento,
      frequencia: expense.expense.frequencia,
      nome: expense.expense.nome,
      recorrente: expense.expense.recorrente,
      replicar: expense.expense.replicar
    }

    return output
  }
}