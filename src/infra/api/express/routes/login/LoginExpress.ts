import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route";
import { LoginUserUseCase } from "../../../../../useCases/login/LoginUseCase";
import { UserNotFoundError, InvalidCredentialsError } from "../../../errors/UserNotFoundError";

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
            return res.status(400).json({ error: "Username and password are required" });
          }
          const input = { username, password };
          const output = await this.loginUserService.execute(input);

          res.status(200).json({ 
            statusCode: 200,
            result: output.token
           });

        } catch (error) {
          if (error instanceof UserNotFoundError) {
            res.status(200).json({ 
              statusCode: 404,
              error: 'Usuario não encontrado.'
             });
          } else if (error instanceof InvalidCredentialsError) {
            res.status(500).json({ 
              statusCode: 404,
              error: 'Credenciais inválidas'
             });
          } else {
            console.error(error);
            res.status(500).json({ 
              statusCode: 500,
              error: 'Erro interno do servidor'
             });
          }
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
}
