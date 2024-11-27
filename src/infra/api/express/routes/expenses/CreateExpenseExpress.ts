import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route";
import { CreateExpenseInputDto, CreateExpenseUseCase } from "../../../../../useCases/expenses/create/CreateExpenseUseCase";

export type CreateExpenseResponseDto = {
  id: string
}

export class CreateExpenseRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createExpenseService: CreateExpenseUseCase
  ) {}

  public static create(
    createExpenseService: CreateExpenseUseCase
  ): CreateExpenseRoute {
    return new CreateExpenseRoute(
      "/create-expense",
      HttpMethod.POST,
      createExpenseService
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const { id, name, frequency, recurring, replicate, dueDate } = request.body;

          const customerId = request.cookies.customerId;      

          const input: CreateExpenseInputDto = {
            id,
            name,
            customerId,
            frequency,
            recurring,
            replicate,
            dueDate
          };  

          const output: CreateExpenseInputDto = await this.createExpenseService.execute(input);

          const responseBody = this.present(output);

          response.status(200).json({
            statusCode: 200,
            result: responseBody
          });
        } catch (error) {
          console.error("Error in CreateUserRoute:", error);
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

  private present(input: CreateExpenseResponseDto): CreateExpenseResponseDto {
    const response = { id: input.id }

    return response
  }
}