import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../../../interfaces/routes/route";
import { ExpenseSparkTotalUseCase } from "../../../../../../application/use-cases/expenses/overview/sparks/ExpenseSparkTotalUseCase";
import { ExpenseDonutUseCase } from "../../../../../../application/use-cases/expenses/overview/donut/ExpenseDonutUseCase";

export class ExpenseDonutRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly expenseDonutUseCase: ExpenseDonutUseCase
  ) {}

  public static create(
    expenseDonutUseCase: ExpenseDonutUseCase
  ): ExpenseDonutRoute {
    return new ExpenseDonutRoute(
      "/expense/overview/donut",
      HttpMethod.GET,
      expenseDonutUseCase
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const {inicio, fim} = request.query;
      
          const customerId = request.cookies.customerId;
                    
          const output = await this.expenseDonutUseCase.execute({ 
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