import { Expense } from "../../../../domain/entities/expenses/expense";
import { ExpenseModelInputDto } from "../../../../domain/interfaces/IExpense";
import { ExpenseGateway } from "../../../../infra/gateways/expenses/ExpenseGateway";
import { ExpenseDto } from "../../../dtos/expensesDto";
import { UseCase } from "../../UseCase";

export class EditExpenseUseCase implements UseCase<ExpenseModelInputDto, ExpenseDto> {
  private constructor(private readonly expenseGateway: ExpenseGateway) {}

  public static create(expenseGateway: ExpenseGateway): EditExpenseUseCase {
    return new EditExpenseUseCase(expenseGateway);
  }

  public async execute(input: ExpenseModelInputDto, customerId?: string, despesaId?: string): Promise<ExpenseDto> {
    const expense: ExpenseModelInputDto = {
      id: input.id,
      nome: input.nome,
      recorrente: input.recorrente,
      replicar: input.replicar,
      categoria: input.categoria || '',
      vencimento: input.vencimento,
      frequencia: input.frequencia,
      valor: input.valor || '0',
      descricao: input.descricao || "",
      observacao: input.observacao || "",
      status: input.status || "2",
      customerId: customerId || "",
      despesaId: input.despesaId,
      mes: input.mes,
      ano: input.ano
    };

    if (expense.replicar) {
      const aExpense = Expense.create(expense);
      
      await this.expenseGateway.editAll(input, customerId!);  
      
      return this.presentOutput(aExpense);
    } else {
      const expenseSingle = Expense.create(input);

      await this.expenseGateway.edit(expenseSingle, customerId!);  

      return this.presentOutput(expenseSingle);
    }
  }

  private presentOutput(expense: ExpenseDto): ExpenseDto {
    return {
      id: expense.id,
      customerId: expense.customerId,
      vencimento: expense.vencimento,
      frequencia: expense.frequencia,
      nome: expense.nome,
      recorrente: expense.recorrente,
      replicar: expense.replicar,
      meses: expense.meses,
    };
  }
}
