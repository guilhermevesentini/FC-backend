import { EditPerMonthInputDto, EditPerMonthOutputDto, ExpenseModelDto } from "../../../domain/_interfaces/IExpense";
import { Expense } from "../../../domain/expenses/entity/expense";
import { ExpenseModel } from "../../../domain/expenses/entity/expenseModel";
import { ExpenseMonth } from "../../../domain/expenses/entity/expenseMonth";
import { ExpenseGateway } from "../../../domain/expenses/gateway/ExpenseGateway";
import { UseCase } from "../../usercase"

export class EditExpenseUseCase implements UseCase<EditPerMonthInputDto, EditPerMonthOutputDto>{
  private constructor(
    private readonly expenseGateway: ExpenseGateway
  ) {}

  public static create(
    expenseGateway: ExpenseGateway
  ): EditExpenseUseCase {
    return new EditExpenseUseCase(expenseGateway);
  }

  public async execute(expense: ExpenseModelDto, customerId: string): Promise<EditPerMonthOutputDto> {
    const aExpense = await Expense.create(expense);

    const aMonths = await ExpenseModel.create(expense);

    if (expense.replicar) {
      const aMonths = await Promise.all(
        expense.map(async (m) => {
          return await ExpenseMonth.create({...m, customerId: customerId, despesaId: expense.id});
        })
      );
    } else {

    }
    

    const expenseModel: EditPerMonthInputDto = {
      ...aExpense.expense,
      meses: aMonth
    }

    await this.expenseGateway.edit(expenseModel, customerId)

    const output: EditPerMonthOutputDto = this.presentOutput(expenseModel)

    return output
  }  

  private presentOutput(expense: EditPerMonthInputDto): EditPerMonthOutputDto {
    const output: EditPerMonthOutputDto = {
      id: expense.id,
      customerId: expense.customerId,
      vencimento: expense.vencimento,
      frequencia: expense.frequencia,
      nome: expense.nome,
      recorrente: expense.recorrente,
      replicar: expense.replicar,
      meses: expense.meses
    }

    return output
  }
}