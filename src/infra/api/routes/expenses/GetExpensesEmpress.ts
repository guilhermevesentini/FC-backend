import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../interfaces/routes/route";
import { ExpenseDto, GetExpensePerMonthInputDto } from "../../../../application/dtos/expenses/expensesDto";
import { GetExpenseMonthUseCase } from "../../../../application/use-cases/expenses/get/GetExpensesMonthUseCase";
import { ExpenseMonthOutputDto } from "../../../../domain/interfaces/IExpense";

export class GetExpenseRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly getExpensePerMonthService: GetExpenseMonthUseCase//criar usecase
  ) {}

  public static create(
    getExpensePerMonthService: GetExpenseMonthUseCase
  ): GetExpenseRoute {
    return new GetExpenseRoute(
      "/get-expense/",
      HttpMethod.GET,
      getExpensePerMonthService
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const {mes, ano} = request.query;

          if (!mes || !ano) return response.status(400).json({ error: "Obrigatório mes e ano" });

          const customerId = request.cookies.customerId;      

          const input: GetExpensePerMonthInputDto = {//tratar os dados
            mes: Number(mes),
            ano: Number(ano),
            customerId
          };  

          const output: ExpenseDto[] = await this.getExpensePerMonthService.execute(input);

          response.status(200).json({
            statusCode: 200,
            result: output
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
}