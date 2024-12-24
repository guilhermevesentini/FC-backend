import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../../../interfaces/routes/route";
import { ExpenseSparkTotalUseCase } from "../../../../../../application/use-cases/expenses/overview/sparks/ExpenseSparkTotalUseCase";

export class ExpenseSparkTotalRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly expenseSparkTotalUseCase: ExpenseSparkTotalUseCase
  ) {}

  public static create(
    expenseSparkTotalUseCase: ExpenseSparkTotalUseCase
  ): ExpenseSparkTotalRoute {
    return new ExpenseSparkTotalRoute(
      "/expense/overview/spark",
      HttpMethod.GET,
      expenseSparkTotalUseCase
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const {inicio, fim} = request.query;
      
          const customerId = request.cookies.customerId;
                    
          const output = await this.expenseSparkTotalUseCase.execute({ 
            inicio: new Date(inicio as string),
            fim: new Date(fim as string),
            customerId: customerId
          });
          
          
          
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