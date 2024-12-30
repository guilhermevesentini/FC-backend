import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../interfaces/routes/route";
import { DeleteExpenseUseCase } from "../../../../application/use-cases/expenses/DeleteExpenseUseCase";
import { ResponseHandler } from "../../../../interfaces/controllers/ResponseHandlers";

export class DeleteExpenseRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly deleteExpenseUseCase: DeleteExpenseUseCase
  ) {}

  public static create(
    deleteExpenseUseCase: DeleteExpenseUseCase
  ): DeleteExpenseRoute {
    return new DeleteExpenseRoute(
      "/delete-expense",
      HttpMethod.POST,
      deleteExpenseUseCase
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const { despesaId, mes } = request.body;

          const customerId = request.cookies.customerId;
          
          await this.deleteExpenseUseCase.execute({ customerId, id: despesaId, mes });

          ResponseHandler.success(response, true);
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
}