import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../interfaces/routes/route";
import { ExpenseDto } from "../../../../application/dtos/expensesDto";
import { EditExpenseUseCase } from "../../../../application/use-cases/expenses/EditExpenseUseCase";
import { ResponseHandler } from "../../../../interfaces/controllers/ResponseHandlers";

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

          const customerId = request.headers['x-customer-id']?.toString();

          if (!customerId) {
            throw Error('Erro ao obter o customerId');
          }   
          
          const output = await this.editExpenseUseCase.execute({...expenseData, customerId});       

          const responseBody = this.present(output);

          ResponseHandler.success(response, responseBody);
        } catch (error) {
          ResponseHandler.internalError(response, error as string);
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

  private present(expense: ExpenseDto): ExpenseDto {
    const output: ExpenseDto = {
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
      meses: expense.meses
    }

    return output
  }
}