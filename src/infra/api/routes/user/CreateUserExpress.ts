import { Request, Response } from "express"
import { HttpMethod, Route } from "../../../../interfaces/routes/route"
import { CreateUserUseCase } from "../../../../application/use-cases/users/create/CreateUserUseCase";
import { UserDto, UserInputDto } from "../../../../application/dtos/usersDto";
import { ResponseHandler } from "../../../../interfaces/controllers/ResponseHandlers";

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

          const input: UserInputDto = {
            username,
            password,
          };

          const output: UserDto = await this.createUserService.execute(input);

          const responseBody = this.present(output);

          ResponseHandler.success(response, true)
          
        } catch (error) {
          console.error("Error in CreateUserRoute:", error);
          ResponseHandler.internalError(response, error as string)
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