import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../interfaces/routes/route";
import { GetIncomeUseCase } from "../../../../application/use-cases/income/GetIncomeUseCase";

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
      
          const customerId = request.cookies.customerId;
                    
          const incomes = await this.getIncomeUseCase.execute({ mes: Number(mes), ano: Number(ano), customerId: customerId });
          
          response.status(200).json({
            statusCode: 200,
            result: incomes
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