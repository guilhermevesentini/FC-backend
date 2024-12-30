import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../../interfaces/routes/route";
import { DeleteBankAccountUseCase } from "../../../../../application/use-cases/bankCards/DeleteBanckAccountUseCase";
import { ResponseHandler } from "../../../../../interfaces/controllers/ResponseHandlers";

export class DeleteBankAccountRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly deleteBankAccountUseCase: DeleteBankAccountUseCase
  ) {}

  public static create(
    deleteBankAccountUseCase: DeleteBankAccountUseCase
  ): DeleteBankAccountRoute {
    return new DeleteBankAccountRoute(
      "/delete-bank-account",
      HttpMethod.POST,
      deleteBankAccountUseCase
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {      
          const body = request.body

          const customerId = request.headers['x-customer-id']?.toString();

          if (!customerId) {
            throw Error('Erro ao obter o customerId');
          }   
                    
          await this.deleteBankAccountUseCase.execute({ customerId: customerId, id: body.id });
          
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