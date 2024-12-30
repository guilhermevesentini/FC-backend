import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../interfaces/routes/route";
import { CreateIncomeUseCase } from "../../../../application/use-cases/income/CreateIncomeUseCase";
import { ResponseHandler } from "../../../../interfaces/controllers/ResponseHandlers";

export class CreateIncomeRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createIncomeUseCase: CreateIncomeUseCase
  ) {}

  public static create(
    createIncomeUseCase: CreateIncomeUseCase
  ): CreateIncomeRoute {
    return new CreateIncomeRoute(
      "/create-income",
      HttpMethod.POST,
      createIncomeUseCase
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const incomeData = request.body;
      
          const customerId = request.headers['x-customer-id']?.toString();

          if (!customerId) {
            throw Error('Erro ao obter o customerId');
          }   
                    
          await this.createIncomeUseCase.execute({ ...incomeData, customerId: customerId });
          
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