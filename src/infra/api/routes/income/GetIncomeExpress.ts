import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../interfaces/routes/route";
import { GetIncomeUseCase } from "../../../../application/use-cases/income/GetIncomeUseCase";
import { ResponseHandler } from "../../../../interfaces/controllers/ResponseHandlers";

export class GetIncomeRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly getIncomeUseCase: GetIncomeUseCase
  ) {}

  public static create(
    getIncomeUseCase: GetIncomeUseCase
  ): GetIncomeRoute {
    return new GetIncomeRoute(
      "/get-income",
      HttpMethod.GET,
      getIncomeUseCase
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const {mes, ano} = request.query;
      
          const customerId = request.headers['x-customer-id']?.toString();

          if (!customerId) {
            throw Error('Erro ao obter o customerId');
          }   
                    
          const incomes = await this.getIncomeUseCase.execute({ mes: Number(mes), ano: Number(ano), customerId: customerId });
          
          ResponseHandler.success(response, incomes)
        } catch (error) {
          ResponseHandler.internalError(response, error as string)
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