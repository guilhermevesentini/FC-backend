import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../../interfaces/routes/route";
import { CreateBankAccountUseCase } from "../../../../../application/use-cases/bankCards/CreateBankAccountUseCase";
import { ResponseHandler } from "../../../../../interfaces/controllers/ResponseHandlers";

export class CreateBankAccountRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createBankAccountUseCase: CreateBankAccountUseCase
  ) {}

  public static create(
    createBankAccountUseCase: CreateBankAccountUseCase
  ): CreateBankAccountRoute {
    return new CreateBankAccountRoute(
      "/create-bank-account",
      HttpMethod.POST,
      createBankAccountUseCase
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const accountData = request.body;
      
          const customerId = request.headers['x-customer-id']?.toString();

          if (!customerId) {
            throw Error('Erro ao obter o customerId');
          }   
                    
          const output = await this.createBankAccountUseCase.execute({ ...accountData, customerId: customerId });
          
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