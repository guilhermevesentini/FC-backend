import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../interfaces/routes/route";
import { OverviewDonutUseCase } from "../../../../application/use-cases/overview/OverviewDonutUseCase";
import { OverviewResumoMovimentoUseCase } from "../../../../application/use-cases/overview/OverviewResumoMovimentoUseCase";

export class OverviewResumoMovimentosRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly overviewResumoMovimentoUseCase: OverviewResumoMovimentoUseCase
  ) {}

  public static create(
    overviewResumoMovimentoUseCase: OverviewResumoMovimentoUseCase
  ): OverviewResumoMovimentosRoute {
    return new OverviewResumoMovimentosRoute(
      "/overview/resumo-movimentos",
      HttpMethod.GET,
      overviewResumoMovimentoUseCase
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const {inicio, fim} = request.query;
      
          const customerId = request.cookies.customerId;
                    
          const output = await this.overviewResumoMovimentoUseCase.execute(customerId); 
          
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