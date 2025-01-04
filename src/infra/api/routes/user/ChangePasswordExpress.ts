import { Request, Response } from "express"
import { HttpMethod, Route } from "../../../../interfaces/routes/route"
import { ResponseHandler } from "../../../../interfaces/controllers/ResponseHandlers";
import { ChangePasswordUseCase } from "../../../../application/use-cases/users/ChangePasswordUseCase";

export class ChangePasswordUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly changePasswordUseCase: ChangePasswordUseCase
  ) {}

  public static create(
    changePasswordUseCase: ChangePasswordUseCase
  ): ChangePasswordUserRoute {
    return new ChangePasswordUserRoute(
      "/change-password/",
      HttpMethod.POST,
      changePasswordUseCase
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const { form } = request.body;  
  
          if (!form.email && !form.senha && !form.novaSenha) {
            ResponseHandler.error(response, 'Houve um erro ao solicitar para alterar a senha')
  
            return;
          }
  
          const output = await this.changePasswordUseCase.execute({email: form.email, senha: form.senha, novaSenha: form.novaSenha});
  
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
}