import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../interfaces/routes/route";
import { CreateIncomeUseCase } from "../../../../application/use-cases/income/CreateIncomeUseCase";

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
      
          const customerId = request.cookies.customerId;
                    
          await this.createIncomeUseCase.execute({ ...incomeData, customerId: customerId });
          
          response.status(200).json({
            statusCode: 200,
            result: true
          });
        } catch (error) {
          console.error("Error:", error);
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