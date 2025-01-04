import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../../../../interfaces/routes/route";
import dotenv from "dotenv";
import { LoginUserUseCase } from "../../../../application/use-cases/login/LoginUseCase";
import { ResponseHandler } from "../../../../interfaces/controllers/ResponseHandlers";

dotenv.config();
export class LoginRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly loginUserService: LoginUserUseCase
  ) {}

  public static create(
    loginUserService: LoginUserUseCase
  ): LoginRoute {
    return new LoginRoute(
      "/auth/login",
      HttpMethod.POST,
      loginUserService
    );
  }
  
  getHandler(): Array<(req: Request, res: Response, next: NextFunction) => void> {
    return [
      async (req: Request, res: Response) => {
        try {
          const { email, password } = req.body;          
          
          if (!email || !password) {
            return ResponseHandler.error(res, 'Usuário e senha são obrigatórios');            
          }
          
          const output = await this.loginUserService.execute({email, password});

          if (!output) {         
            return ResponseHandler.success(res, 'Ocorreu um erro, tente novamente mais tarde.');
          }

          return ResponseHandler.success(res, output.token);

        } catch (error) {
          this.handleError(res, error);          
        }
      },
    ];
  }

  getPath(): string {
    return this.path;
  }

  getMethod(): HttpMethod {
    return this.method;
  }

  private handleError(res: Response, error: unknown): ResponseHandler | undefined {
    const errorMap: Record<string, { statusCode: number; message: string }> = {
      UserNotFoundError: { statusCode: 404, message: "Usuário não encontrado." },
      InvalidCredentialsError: { statusCode: 401, message: "Senha inválida." },
    };

    if (error instanceof Error) {
      const mappedError = errorMap[error.name];

      // Erro mapeado
      if (mappedError) {
        return ResponseHandler.error(res, mappedError.message);
      }

      // Erro genérico
      return ResponseHandler.error(res, error.message);
    } else {
      // Caso o erro não seja uma instância de Error
      return ResponseHandler.error(res, 'Erro interno no servidor');
    }
  }
}
