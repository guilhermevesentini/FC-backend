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
          const { username, password } = req.body;          
          
          if (!username || !password) {
            return ResponseHandler.error(res, 'Usuário e senha são obrigatórios');            
          }
          
          const output = await this.loginUserService.execute({username, password});

          if (!output) {         
            return ResponseHandler.error(res, 'Ocorreu um erro, tente novamente mais tarde.');
          } 
          
          res.cookie('customerId', output.customerId, { 
            httpOnly: false, 
            maxAge: 86400000,  // 24 horas
            secure: process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development",
            sameSite: "none"
          });

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

      if (mappedError) {
        return ResponseHandler.error(res, mappedError.message);
      }

      return ResponseHandler.error(res, error.message);
    }
  }
}
