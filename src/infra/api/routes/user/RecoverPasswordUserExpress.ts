import { Request, Response } from "express"
import { HttpMethod, Route } from "../../../../interfaces/routes/route"
import { FindUserOutputDto } from "../../../../application/dtos/usersDto";
import { ResponseHandler } from "../../../../interfaces/controllers/ResponseHandlers";
import { RecoverPasswordUseCase } from "../../../../application/use-cases/users/RecoverPasswordUseCase";

export class RecoverPasswordUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly recoverPasswordUseCase: RecoverPasswordUseCase
  ) {}

  public static create(
    recoverPasswordUseCase: RecoverPasswordUseCase
  ): RecoverPasswordUserRoute {
    return new RecoverPasswordUserRoute(
      "/recover-password/:email",
      HttpMethod.GET,
      recoverPasswordUseCase
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const { email } = request.params;  
  
          if (!email) {
            ResponseHandler.error(response, 'Nome do usuário é obrigatório')
  
            return;
          }
  
          const output = await this.recoverPasswordUseCase.execute({email});
  
          if (!output) {
            ResponseHandler.error(response, 'Usuário não encontrado')
  
            return;
          }
  
          ResponseHandler.success(response, true)
        } catch (error) {
          console.error("Error in FindUserRoute:", error);
  
          ResponseHandler.internalError(response, error as string)
        }
      }
    ]
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
      return this.method;
  }

  private present(input: FindUserOutputDto): FindUserOutputDto {
      const response: FindUserOutputDto = {
        id: input.id,
        email: input.email,
        username: input.username,
        password: input.password
      };

      return response;
  }
}