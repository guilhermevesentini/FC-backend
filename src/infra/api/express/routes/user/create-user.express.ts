import { Request, Response } from "express"
import { CreateUserInputDto, CreateUserOutputDto, CreateUserUseCase } from "../../../../../useCases/user/create-user/create-user.usecase"
import { HttpMethod, Route } from "../route"

export type CreateUserResponseDto = {
  id: string
}

export class CreateUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createUserService: CreateUserUseCase
  ){}

  public static create(createUserService: CreateUserUseCase) {
    return new CreateUserRoute(
      "/create-user",
      HttpMethod.POST,
      createUserService
    )
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const {username, password} = request.body

      const input: CreateUserInputDto = {
        username,
        password
      }

      const output: CreateUserOutputDto = await this.createUserService.execute(input)

      const responseBody = this.present(output)

      response.status(201).json(responseBody)
    }
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