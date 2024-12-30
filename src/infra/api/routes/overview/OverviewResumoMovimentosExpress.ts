import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../interfaces/routes/route";
import { OverviewDonutUseCase } from "../../../../application/use-cases/overview/OverviewDonutUseCase";
import { OverviewResumoMovimentoUseCase } from "../../../../application/use-cases/overview/OverviewResumoMovimentoUseCase";
import { ResponseHandler } from "../../../../interfaces/controllers/ResponseHandlers";

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
          
          ResponseHandler.success(response, output)
        } catch (error) {
          console.error("Error in CreateExpenseRoute:", error);
          ResponseHandler.internalError(response, error as string)
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