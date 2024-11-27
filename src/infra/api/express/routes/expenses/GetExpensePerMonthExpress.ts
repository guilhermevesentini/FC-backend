import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { ExpenseMonthOutputDto, GetExpenseMonthInputDto, GetExpenseMonthUseCase } from "../../../../../useCases/expenses/get/GetExpensesMonthUseCase";

export type GetExpenseMonthResponseDto = {
  id: string
  month: number;
  year: number
  value: string
  status: string
  description: string  
  customerId: string
  dueDate: Date;
  comment: string
}

export class GetExpenseMonthRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly getExpenseMonthService: GetExpenseMonthUseCase//criar usecase
  ) {}

  public static create(
    getExpenseMonthService: GetExpenseMonthUseCase
  ): GetExpenseMonthRoute {
    return new GetExpenseMonthRoute(
      "/get-expense-month/",
      HttpMethod.GET,
      getExpenseMonthService
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const {month, year} = request.body;

          const customerId = request.cookies.customerId;      

          const input: GetExpenseMonthInputDto = {//tratar os dados
            month,
            year,
            customerId
          };  

          const output: ExpenseMonthOutputDto[] = await this.getExpenseMonthService.execute(input);

          const responseBody = output.map(this.present);

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

  private present(input: ExpenseMonthOutputDto): GetExpenseMonthResponseDto {
    const response: GetExpenseMonthResponseDto = {
      id: input.id,
      month: input.month,
      year: input.year,
      value: input.value,
      status: input.status,
      description: input.description,
      customerId: input.customerId,
      dueDate: input.dueDate,
      comment: input.comment,
    };

    return response;
  }
}