import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../../../../interfaces/routes/route";
import dotenv from "dotenv";
import { LoginUserUseCase } from "../../../../application/use-cases/login/LoginUseCase";

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
  
  //logout res.clearCookie('userId');

  getHandler(): Array<(req: Request, res: Response, next: NextFunction) => void> {
    return [
      async (req: Request, res: Response) => {
        try {
          const { username, password } = req.body;          
          
          if (!username || !password) {
            return res.status(400).json({ error: "Usuário e senha são obrigatórios" });
          }
          
          const output = await this.loginUserService.execute({username, password});

          if (!output) {
            res.status(200).json({statusCode: 400, result: 'Ocorreu um erro, tente novamente mais tarde.'});

            return
          } 
          
          res.cookie('customerId', output.customerId, { 
            httpOnly: true, 
            maxAge: 86400000,  // 24 horas
            secure: process.env.NODE_ENV === "production",
            sameSite: "none"
          });

          return res.status(200).json({ 
            statusCode: 200,
            result: output.token
          });

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

  private sendError(res: Response, statusCode: number, message: string): void {
    res.status(statusCode).json({
      statusCode,
      error: message,
    });
  }

  private handleError(res: Response, error: unknown): void {
    const errorMap: Record<string, { statusCode: number; message: string }> = {
      UserNotFoundError: { statusCode: 404, message: "Usuário não encontrado." },
      InvalidCredentialsError: { statusCode: 401, message: "Senha inválida." },
    };

    if (error instanceof Error) {
      const mappedError = errorMap[error.name];

      if (mappedError) {
        this.sendError(res, mappedError.statusCode, mappedError.message);
        return;
      }

      console.error("Erro desconhecido:", error);
      this.sendError(res, 500, "Erro interno do servidor");
    }
  }
}
