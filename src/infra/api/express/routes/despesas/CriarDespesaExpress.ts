import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route";
import { CriarDespesaInputDto, CriarDespesaOutputDto, CriarDespesaUseCase } from "../../../../../useCases/despesas/CriarDespesaUseCase";

export type CriarDespesaResponseDto = {
  id: string
}

export class CriarDespesaRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly criarDespesaService: CriarDespesaUseCase
  ) {}

  public static create(
    criarDespesaService: CriarDespesaUseCase
  ): CriarDespesaRoute {
    return new CriarDespesaRoute(
      "/criar-despesa",
      HttpMethod.POST,
      criarDespesaService
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const { frequencia, id, nome, recorrente, replicar, vencimento} = request.body;

          const customerId = request.cookies.customerId;

          console.log('customerId', customerId);          

          const input: CriarDespesaInputDto = {
            customerId,
            frequencia,
            id,
            nome,
            recorrente,
            replicar,
            vencimento
          };          

          const output: CriarDespesaOutputDto = await this.criarDespesaService.execute(input);

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

  private present(input: CriarDespesaResponseDto): CriarDespesaResponseDto {
    const response = { id: input.id }

    return response
  }
}