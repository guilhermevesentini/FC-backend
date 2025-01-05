import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../interfaces/routes/route";
import { ResponseHandler } from "../../../../interfaces/controllers/ResponseHandlers";
import { CreateCategoryUseCase } from "../../../../application/use-cases/categories/CreateCategoryUseCase";
import { GetCategoryUseCase } from "../../../../application/use-cases/categories/GetCategoriesUseCase";

export class GetCategoriesRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly getCategoriesUseCase: GetCategoryUseCase
  ) {}

  public static create(
    getCategoriesUseCase: GetCategoryUseCase
  ): GetCategoriesRoute {
    return new GetCategoriesRoute(
      "/get-categories",
      HttpMethod.GET,
      getCategoriesUseCase
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const { tipo } = request.query;
          
          const customerId = request.headers['x-customer-id'];

          if (!customerId) {
            throw Error('Erro ao obter o customerId dos cabeçalhos');
          }
          
          const output = await this.getCategoriesUseCase.execute({ tipo: Number(tipo), customerId: customerId as string });

          ResponseHandler.success(response, output);
        } catch (error) {
          ResponseHandler.internalError(response, error as string);
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