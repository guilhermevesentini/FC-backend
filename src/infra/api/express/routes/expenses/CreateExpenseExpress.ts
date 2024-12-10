import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { CreateExpenseResponseDto } from "../../../../../domain/interfaces/IExpense";
import { CreateExpenseUseCase } from "../../../../../application/use-cases/expenses/create/CreateExpenseUseCase";
import { CreateExpenseMonthUseCase } from "../../../../../application/use-cases/expenses/create/CreateExpenseMonthUseCase";

export class CreateExpenseRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createExpenseUseCase: CreateExpenseUseCase,
    private readonly createExpenseMonthUseCase: CreateExpenseMonthUseCase
  ) {}

  public static create(
    createExpenseUseCase: CreateExpenseUseCase,
    createExpenseMonthUseCase: CreateExpenseMonthUseCase
  ): CreateExpenseRoute {
    return new CreateExpenseRoute(
      "/create-expense",
      HttpMethod.POST,
      createExpenseUseCase,
      createExpenseMonthUseCase
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const {  meses, ...expenseData } = request.body;

          const customerId = request.cookies.customerId;
          
          const output = await this.createExpenseUseCase.execute({ ...expenseData, customerId: customerId });
          
          if (Array.isArray(meses)) {
            await this.createExpenseMonthUseCase.execute({ mes: meses, customerId, despesaId: output.id });
          }          

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