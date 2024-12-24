import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../../interfaces/routes/route";
import { DeleteBankAccountUseCase } from "../../../../../application/use-cases/bankCards/DeleteBanckAccountUseCase";

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

          const customerId = request.cookies.customerId;
                    
          await this.deleteBankAccountUseCase.execute({ customerId: customerId, id: body.id });
          
          response.status(200).json({
            statusCode: 200,
            result: true
          });
        } catch (error) {
          console.error("Error in CreateExpenseRoute:", error);
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