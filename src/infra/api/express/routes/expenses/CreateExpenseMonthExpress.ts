import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { CreateExpenseMonthInputDto, CreateExpenseMonthOutputDto, CreateExpenseMonthResponseDto } from "../../../../../domain/interfaces/IExpense";
import { CreateExpenseMonthUseCase } from "../../../../../application/use-cases/expenses/create/CreateExpenseMonthUseCase";

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
          const {id, mes, ano, valor, status, descricao, vencimento, observacao, despesaId} = request.body;

          const customerId = request.cookies.customerId;      

          const input: CreateExpenseMonthInputDto[] = [{//tratar os dados
            id,
            mes,
            ano,
            customerId,
            despesaId,
            valor,
            status,
            descricao,
            vencimento,
            observacao
          }];        

          const output: CreateExpenseMonthOutputDto[] = await this.createExpenseMonthService.execute(input, customerId, despesaId);

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
      mes: input.mes,
      despesaId: input.despesaId,
      ano: input.ano,
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