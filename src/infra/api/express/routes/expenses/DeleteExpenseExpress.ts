import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route";
import { CreateExpenseUseCase } from "../../../../../useCases/expenses/create/CreateExpenseUseCase";
import { CreateExpenseMonthUseCase } from "../../../../../useCases/expenses/create/CreateExpenseMonthUseCase";
import { CreateExpenseResponseDto } from "../../../../../domain/_interfaces/IExpense";
import { DeleteExpenseUseCase } from "../../../../../useCases/expenses/delete/DeleteExpenseUseCase";

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

          response.status(200).json({
            statusCode: 200,
            result: true
          });
        } catch (error) {
          console.error("Error in DeletedExpenseRoute:", error);
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
}