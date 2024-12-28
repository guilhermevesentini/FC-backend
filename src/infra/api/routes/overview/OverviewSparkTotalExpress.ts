import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../interfaces/routes/route";
import { OverviewSparkTotalUseCase } from "../../../../application/use-cases/overview/OverviewSparkTotalUseCase";

export class OverviewSparkTotalRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly overviewSparkTotalUseCase: OverviewSparkTotalUseCase
  ) {}

  public static create(
    overviewSparkTotalUseCase: OverviewSparkTotalUseCase
  ): OverviewSparkTotalRoute {
    return new OverviewSparkTotalRoute(
      "/overview/spark",
      HttpMethod.GET,
      overviewSparkTotalUseCase
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const {inicio, fim} = request.query;
      
          const customerId = request.cookies.customerId;
                    
          const output = await this.overviewSparkTotalUseCase.execute({ 
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