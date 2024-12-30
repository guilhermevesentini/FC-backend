import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../interfaces/routes/route";
import { obterListaDeBancos } from "../../../services/BancoApiService";
import { ResponseHandler } from "../../../../interfaces/controllers/ResponseHandlers";

export class BankListRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod
  ) {}

  public static create(): BankListRoute {
    return new BankListRoute(
      "/get-banks/",
      HttpMethod.GET
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const output = await obterListaDeBancos();

          ResponseHandler.success(response, output);
        } catch (error) {
          ResponseHandler.internalError(response, error as string);
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
}