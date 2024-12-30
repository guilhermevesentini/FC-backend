import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../interfaces/routes/route";
import { ExpenseDto, GetExpenseMonthInputDto } from "../../../../application/dtos/expensesDto";
import { GetExpenseMonthUseCase } from "../../../../application/use-cases/expenses/GetExpensesMonthUseCase";
import { ResponseHandler } from "../../../../interfaces/controllers/ResponseHandlers";

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

          if (!mes || !ano) return ResponseHandler.error(response, 'Obrigatório mes e ano')

          const customerId = request.cookies.customerId;      

          const input: GetExpenseMonthInputDto = {//tratar os dados
            mes: Number(mes),
            ano: Number(ano),
            customerId
          };  

          const output: ExpenseDto[] = await this.getExpensePerMonthService.execute(input);

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