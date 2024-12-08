import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { EditExpenseUseCase } from "../../../../../useCases/expenses/edit/EditExpenseUseCase";
import { EditPerMonthInputDto, EditPerMonthOutputDto, ExpenseModelDto, IExpenseMonth } from "../../../../../domain/_interfaces/IExpense";

export class EditExpenseRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly editExpenseUseCase: EditExpenseUseCase
  ) {}

  public static create(
    editExpenseUseCase: EditExpenseUseCase
  ): EditExpenseRoute {
    return new EditExpenseRoute(
      "/edit-expense",
      HttpMethod.POST,
      editExpenseUseCase
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const { ...expenseData } = request.body;

          const customerId = request.cookies.customerId;

          const expenseModel: ExpenseModelDto = {
            ...expenseData
          }
          
          const output = await this.editExpenseUseCase.execute(expenseModel, customerId);       

          const responseBody = this.present(output);

          response.status(200).json({
            statusCode: 200,
            result: responseBody
          });
        } catch (error) {
          console.error("Error in CreateUserRoute:", error);
          response.status(500).json({ error: "Internal server error" });
        }
      },
    ];
  }

  public getPath(): string {
    return this.path;
  }
  public getMethod(): HttpMethod {
    return this.method;
  }

  private present(expense: EditPerMonthInputDto): EditPerMonthOutputDto {
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