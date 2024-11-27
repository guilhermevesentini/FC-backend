import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { GetExpenseMonthInputDto, GetExpenseMonthUseCase } from "../../../../../useCases/expenses/get/GetExpensesMonthUseCase";
import { CreateExpenseMonthInputDto, CreateExpenseMonthOutputDto, CreateExpenseMonthUseCase } from "../../../../../useCases/expenses/create/CreateExpenseMonthUseCase";

export type CreateExpenseMonthResponseDto = {
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

export class CreateExpenseMonthRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createExpenseMonthService: CreateExpenseMonthUseCase//criar usecase
  ) {}

  public static create(
    createExpenseMonthService: CreateExpenseMonthUseCase
  ): CreateExpenseMonthRoute {
    return new CreateExpenseMonthRoute(
      "/create-expense-month/",
      HttpMethod.POST,
      createExpenseMonthService
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const {id, month, year, value, status, description, dueDate, comment} = request.body;

          const customerId = request.cookies.customerId;      

          const input: CreateExpenseMonthInputDto[] = [{//tratar os dados
            id,
            month,
            year,
            customerId,
            value,
            status,
            description,
            dueDate,
            comment
          }];  

          console.log('input', input);
          

          const output: CreateExpenseMonthOutputDto[] = await this.createExpenseMonthService.execute(input);

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

  private present(input: CreateExpenseMonthOutputDto): CreateExpenseMonthResponseDto {
    const response: CreateExpenseMonthResponseDto = {
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