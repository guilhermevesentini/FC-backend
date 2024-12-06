import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { ExpenseMonthOutputDto, GetExpenseMonthInputDto, GetExpenseMonthUseCase } from "../../../../../useCases/expenses/get/GetExpensesMonthUseCase";

export type GetExpenseMonthResponseDto = {
  id: string
  mes: number
  despesaId: string
  ano: number
  valor: string
  status: string
  descricao: string  
  customerId: string
  vencimento: Date;
  observacao: string
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
          const {mes, ano} = request.body;

          const customerId = request.cookies.customerId;      

          const input: GetExpenseMonthInputDto = {//tratar os dados
            mes,
            ano,
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
      mes: input.mes,
      ano: input.ano,
      despesaId: input.despesaId,
      valor: input.valor,
      status: input.status,
      descricao: input.descricao,
      customerId: input.customerId,
      vencimento: input.vencimento,
      observacao: input.observacao,
    };

    return response;
  }
}