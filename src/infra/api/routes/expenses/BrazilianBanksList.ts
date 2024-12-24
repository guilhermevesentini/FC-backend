import { Request, Response } from "express";
import { HttpMethod, Route } from "../../../../interfaces/routes/route";
import { obterListaDeBancos } from "../../../services/BancoApiService";

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

          response.status(200).json({
            statusCode: 200,
            result: output
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
}