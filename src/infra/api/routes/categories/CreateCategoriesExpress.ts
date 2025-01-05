import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../interfaces/routes/route";
import { ResponseHandler } from "../../../../interfaces/controllers/ResponseHandlers";
import { CreateCategoryUseCase } from "../../../../application/use-cases/categories/CreateCategoryUseCase";

export class CreateCategoriesRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createCategoriesUseCase: CreateCategoryUseCase
  ) {}

  public static create(
    createCategoriesUseCase: CreateCategoryUseCase
  ): CreateCategoriesRoute {
    return new CreateCategoriesRoute(
      "/create-category",
      HttpMethod.POST,
      createCategoriesUseCase
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
          
          const output = await this.createCategoriesUseCase.execute({ ...categoryData, customerId: customerId });

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