import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../interfaces/routes/route";
import { DeleteIncomeUseCase } from "../../../../application/use-cases/income/DeleteIncomeUseCase";

export class DeleteIncomeRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly deleteIncomeUseCase: DeleteIncomeUseCase
  ) {}

  public static create(
    deleteIncomeUseCase: DeleteIncomeUseCase
  ): DeleteIncomeRoute {
    return new DeleteIncomeRoute(
      "/delete-income",
      HttpMethod.POST,
      deleteIncomeUseCase
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const { despesaId, mes } = request.body;

          const customerId = request.cookies.customerId;
          
          await this.deleteIncomeUseCase.execute({ customerId, id: despesaId, mes });

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