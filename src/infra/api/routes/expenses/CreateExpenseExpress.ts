import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../interfaces/routes/route";
import { CreateExpenseUseCase } from "../../../../application/use-cases/expenses/CreateExpenseUseCase";

export class CreateExpenseRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createExpenseUseCase: CreateExpenseUseCase
  ) {}

  public static create(
    createExpenseUseCase: CreateExpenseUseCase
  ): CreateExpenseRoute {
    return new CreateExpenseRoute(
      "/create-expense",
      HttpMethod.POST,
      createExpenseUseCase
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const expenseData = request.body;
      
          const customerId = request.cookies.customerId;
                    
          if (!customerId) {
            throw Error('Erro ao obter o cookie')
          }
          const output = await this.createExpenseUseCase.execute({ ...expenseData, customerId: customerId });
          
          response.status(200).json({
            statusCode: 200,
            result: { id: output.id }
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