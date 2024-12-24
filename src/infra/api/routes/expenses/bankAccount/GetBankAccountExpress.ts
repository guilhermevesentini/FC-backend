import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../../interfaces/routes/route";
import { GetBankAccountUseCase } from "../../../../../application/use-cases/bankCards/GetBankAccountUseCase";

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
          const customerId = request.cookies.customerId;
                    
          const output = await this.getBankAccountUseCase.execute({ customerId: customerId });
          
          response.status(200).json({
            statusCode: 200,
            result: output
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