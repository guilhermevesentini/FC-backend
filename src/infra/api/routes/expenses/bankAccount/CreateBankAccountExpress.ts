import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../../interfaces/routes/route";
import { CreateBankAccountUseCase } from "../../../../../application/use-cases/bankCards/CreateBankAccountUseCase";

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
      
          const customerId = request.cookies.customerId;
                    
          const output = await this.createBankAccountUseCase.execute({ ...accountData, customerId: customerId });
          
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