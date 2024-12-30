import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../../interfaces/routes/route";
import { GetBankAccountUseCase } from "../../../../../application/use-cases/bankCards/GetBankAccountUseCase";
import { ResponseHandler } from "../../../../../interfaces/controllers/ResponseHandlers";

export class GetBankAccountRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly getBankAccountUseCase: GetBankAccountUseCase
  ) {}

  public static create(
    getBankAccountUseCase: GetBankAccountUseCase
  ): GetBankAccountRoute {
    return new GetBankAccountRoute(
      "/get-bank-account",
      HttpMethod.GET,
      getBankAccountUseCase
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {      
          const customerId = request.headers['x-customer-id']?.toString();

          if (!customerId) {
            throw Error('Erro ao obter o customerId');
          }   
                    
          const output = await this.getBankAccountUseCase.execute({ customerId: customerId });
          
          ResponseHandler.success(response, output);

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