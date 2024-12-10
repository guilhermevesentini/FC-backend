import { Request, Response } from "express"
import { HttpMethod, Route } from "../route"
import { CreateUserInputDto, CreateUserOutputDto, CreateUserUseCase } from "../../../../../application/use-cases/users/create/CreateUserUseCase";

export type CreateUserResponseDto = {
  id: string
}

export class CreateUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createUserService: CreateUserUseCase
  ){}

  public static create(
    createUserService: CreateUserUseCase
  ): CreateUserRoute {
    return new CreateUserRoute(
      "/create-user",
      HttpMethod.POST,
      createUserService
    );
  }

  public getHandler() {
    return [
      async (request: Request, response: Response) => {
        try {
          const { username, password } = request.body;

          const input: CreateUserInputDto = {
            username,
            password,
          };

          const output: CreateUserOutputDto = await this.createUserService.execute(input);

          const responseBody = this.present(output);

          response.status(200).json({
            statusCode: 200,
            result: true
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

  private present(input: CreateUserResponseDto): CreateUserResponseDto {
    const response = { id: input.id }

    return response
  }
}