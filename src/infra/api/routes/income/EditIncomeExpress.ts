import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../interfaces/routes/route";
import { EditIncomeUseCase } from "../../../../application/use-cases/income/EditIncomeUseCase";
import { IncomeDto } from "../../../../application/dtos/IncomeDto";
import { ResponseHandler } from "../../../../interfaces/controllers/ResponseHandlers";

export class EditIncomeRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly editIncomeUseCase: EditIncomeUseCase
  ) {}

  public static create(
    editIncomeUseCase: EditIncomeUseCase
  ): EditIncomeRoute {
    return new EditIncomeRoute(
      "/edit-income",
      HttpMethod.POST,
      editIncomeUseCase
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const { ...incomeData } = request.body;

          const customerId = request.headers['x-customer-id']?.toString();

          if (!customerId) {
            throw Error('Erro ao obter o customerId');
          }   
          
          const output = await this.editIncomeUseCase.execute({...incomeData, customerId});       

          const responseBody = this.present(output);

          ResponseHandler.success(response, responseBody)

        } catch (error) {
          ResponseHandler.internalError(response, error as string)
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

  private present(expense: IncomeDto): IncomeDto {
    const output: IncomeDto = {
      id: expense.id,
      customerId: expense.customerId,
      recebimento: expense.recebimento,
      tipoLancamento: expense.tipoLancamento,
      range: {
        inicio: expense.range?.inicio,
        fim: expense.range?.fim
      },
      nome: expense.nome,
      replicar: expense.replicar,
      meses: expense.meses
    }

    return output
  }
}