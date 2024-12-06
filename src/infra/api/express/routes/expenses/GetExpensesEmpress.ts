import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { GetExpensePerMonthCase } from "../../../../../useCases/expenses/get/GetExpensePerMonthUseCase";

export type GetExpensePerMonthInputDto = {
  mes: number,
  ano: number,
  customerId: string
};

export type GetExpensePerMonthOutputDto = {
  id: string;
  nome: string;
  recorrente: string
  vencimento: Date
  frequencia: string
  replicar: boolean
  customerId: string
  meses: GetExpensePerMonthResponseDto[];
};

export type GetExpensePerMonthResponseDto = {
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

export class GetExpensePerMonthRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly getExpensePerMonthService: GetExpensePerMonthCase//criar usecase
  ) {}

  public static create(
    getExpensePerMonthService: GetExpensePerMonthCase
  ): GetExpensePerMonthRoute {
    return new GetExpensePerMonthRoute(
      "/get-expense-per-month/",
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

          const output: GetExpensePerMonthOutputDto[] = await this.getExpensePerMonthService.execute(input);

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

  private present(input: GetExpensePerMonthOutputDto): GetExpensePerMonthOutputDto {
    const response: GetExpensePerMonthOutputDto = {
      id: input.id,
      nome: input.nome,
      customerId: input.customerId,
      frequencia: input.frequencia,
      recorrente: input.recorrente,
      replicar: input.replicar,
      vencimento: input.vencimento,
      meses: input.meses,
    };

    return response;
  }
}