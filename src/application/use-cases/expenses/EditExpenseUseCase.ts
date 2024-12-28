import { Expense } from "../../../domain/entities/expenses/expense";
import { ExpenseGateway } from "../../../infra/gateways/expenses/ExpenseGateway";
import { ExpenseDto, ExpenseInputDto } from "../../dtos/expensesDto";
import { UseCase } from "../UseCase";

export class EditExpenseUseCase implements UseCase<ExpenseInputDto, ExpenseDto> {
  private constructor(private readonly expenseGateway: ExpenseGateway) {}

  public static create(expenseGateway: ExpenseGateway): EditExpenseUseCase {
    return new EditExpenseUseCase(expenseGateway);
  }

  public async execute(input: ExpenseInputDto, customerId?: string): Promise<ExpenseDto> {

    if (input.replicar) {
      const aExpense = Expense.create(input);
      
      await this.expenseGateway.editAll(input, customerId!);  
      
      return this.presentOutput(aExpense);
    } else {
      const expenseSingle = Expense.create(input);

      await this.expenseGateway.edit(input);  

      return this.presentOutput(expenseSingle);
    }
  }

  private presentOutput(expense: ExpenseDto): ExpenseDto {
    return {
      id: expense.id,
      customerId: expense.customerId,
      vencimento: expense.vencimento,
      tipoLancamento: expense.tipoLancamento,
      range: {
        inicio: expense.range?.inicio,
        fim: expense.range?.fim
      },
      nome: expense.nome,
      replicar: expense.replicar,
      meses: expense.meses,
    };
  }
}
