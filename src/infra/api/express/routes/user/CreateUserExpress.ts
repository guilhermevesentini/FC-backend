import { Request, Response } from "express"
import { HttpMethod, Route } from "../route"
import { CreateUserInputDto, CreateUserOutputDto, CreateUserUseCase } from "../../../../../useCases/user/create/CreateUserUseCase"
import { AuthMiddleware } from "../../../../auth/AuthMiddleware"

export type CreateUserResponseDto = {
  id: string
}

export class CreateUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createUserService: CreateUserUseCase,
    private readonly authMiddleware: AuthMiddleware
  ){}

  public static create(
    createUserService: CreateUserUseCase, 
    authMiddleware: AuthMiddleware
  ): CreateUserRoute {
    return new CreateUserRoute(
      "/create-user",
      HttpMethod.POST,
      createUserService,
      authMiddleware
    );
  }

  public getHandler() {
    return [
      this.authMiddleware.handle.bind(this.authMiddleware),
      async (request: Request, response: Response) => {
        try {
          const { username, password } = request.body;

          const input: CreateUserInputDto = {
            username,
            password,
          };

          const output: CreateUserOutputDto = await this.createUserService.execute(input);

          const responseBody = this.present(output);

          response.status(201).json(responseBody);
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