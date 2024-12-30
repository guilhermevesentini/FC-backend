import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../interfaces/routes/route";
import { CreateExpenseUseCase } from "../../../../application/use-cases/expenses/CreateExpenseUseCase";
import { ResponseHandler } from "../../../../interfaces/controllers/ResponseHandlers";

export class CreateExpenseRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createExpenseUseCase: CreateExpenseUseCase
  ) {}

  public static create(
    createExpenseUseCase: CreateExpenseUseCase
  ): CreateExpenseRoute {
    return new CreateExpenseRoute(
      "/create-expense",
      HttpMethod.POST,
      createExpenseUseCase
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const expenseData = request.body;
      
          const customerId = request.headers['x-customer-id'];

          if (!customerId) {
            throw Error('Erro ao obter o customerId dos cabeçalhos');
          }
                    
          if (!customerId) {
            throw Error('Erro ao obter o cookie')
          }
          const output = await this.createExpenseUseCase.execute({ ...expenseData, customerId: customerId });

          ResponseHandler.success(response, { id: output.id });
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