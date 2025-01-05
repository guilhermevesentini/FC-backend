import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../interfaces/routes/route";
import { ResponseHandler } from "../../../../interfaces/controllers/ResponseHandlers";
import { DeleteCategoryUseCase } from "../../../../application/use-cases/categories/DeleteCategoryUseCase";

export class DeleteCategoriesRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly deleteCategoriesUseCase: DeleteCategoryUseCase
  ) {}

  public static create(
    deleteCategoriesUseCase: DeleteCategoryUseCase
  ): DeleteCategoriesRoute {
    return new DeleteCategoriesRoute(
      "/delete-category",
      HttpMethod.POST,
      deleteCategoriesUseCase
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const categoryData = request.body;
      
          const customerId = request.headers['x-customer-id'];

          if (!customerId) {
            throw Error('Erro ao obter o customerId dos cabeçalhos');
          }
          
          const output = await this.deleteCategoriesUseCase.execute({ ...categoryData, customerId: customerId });

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