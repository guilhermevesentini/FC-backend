import { Request, Response } from "express"
import { HttpMethod, Route } from "../route"
import { FindUserOutputDto } from "../../../../application/dtos/users/usersDto";
import { FindUserUseCase } from "../../../../application/use-cases/users/find/FindUserUseCase";

export class FindUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly findUserService: FindUserUseCase
  ) {}

  public static create(
    findUserService: FindUserUseCase
  ): FindUserRoute {
    return new FindUserRoute(
      "/find-user/:username",
      HttpMethod.GET,
      findUserService
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const { username } = request.params;  
  
          if (!username) {
            response.status(400).json({ error: "Username is required" });
  
            return;
          }
  
          const output = await this.findUserService.execute({username});
  
          if (!output) {
            response.status(404).json({ error: "User not found" });
  
            return;
          }
  
          const responseBody = this.present(output);
  
          response.status(200).json(responseBody);
        } catch (error) {
          console.error("Error in FindUserRoute:", error);
  
          response.status(500).json({ error: "Internal server error" });
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
        username: input.username,
        password: input.password
      };

      return response;
  }
}