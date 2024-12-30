import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../interfaces/routes/route";
import { DeleteIncomeUseCase } from "../../../../application/use-cases/income/DeleteIncomeUseCase";
import { ResponseHandler } from "../../../../interfaces/controllers/ResponseHandlers";

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

          const customerId = request.headers['x-customer-id']?.toString();

          if (!customerId) {
            throw Error('Erro ao obter o customerId');
          }   
          
          await this.deleteIncomeUseCase.execute({ customerId, id: despesaId, mes });

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