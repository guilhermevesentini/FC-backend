import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../interfaces/routes/route";
import { OverviewDonutUseCase } from "../../../../application/use-cases/overview/OverviewDonutUseCase";
import { ResponseHandler } from "../../../../interfaces/controllers/ResponseHandlers";

export class OverviewDonutRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly overviewDonutUseCase: OverviewDonutUseCase
  ) {}

  public static create(
    overviewDonutUseCase: OverviewDonutUseCase
  ): OverviewDonutRoute {
    return new OverviewDonutRoute(
      "/overview/donut",
      HttpMethod.GET,
      overviewDonutUseCase
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const {inicio, fim} = request.query;
      
          const customerId = request.cookies.customerId;
                    
          const output = await this.overviewDonutUseCase.execute({ 
            inicio: new Date(inicio as string),
            fim: new Date(fim as string),
            customerId: customerId
          }); 
          
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