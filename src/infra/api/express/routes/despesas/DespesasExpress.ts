import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route";

export class DespesasRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    //private readonly loginUserService: LoginUserUseCase
  ) {}

  getHandler(): Array<(req: Request, res: Response, next: NextFunction) => void> {
    throw new Error("Method not implemented.");
  }
  getPath(): string {
    throw new Error("Method not implemented.");
  }
  getMethod(): HttpMethod {
    throw new Error("Method not implemented.");
  }

}