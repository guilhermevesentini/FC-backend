import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../interfaces/routes/route";
import { ResponseHandler } from "../../../../interfaces/controllers/ResponseHandlers";
import { EditCategoryUseCase } from "../../../../application/use-cases/categories/EditCategoryUseCase";

export class EditCategoriesRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly editCategoriesUseCase: EditCategoryUseCase
  ) {}

  public static create(
    editCategoriesUseCase: EditCategoryUseCase
  ): EditCategoriesRoute {
    return new EditCategoriesRoute(
      "/edit-category",
      HttpMethod.POST,
      editCategoriesUseCase
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
          
          const output = await this.editCategoriesUseCase.execute({ ...categoryData, customerId: customerId });

          ResponseHandler.success(response, { id: output.id });
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