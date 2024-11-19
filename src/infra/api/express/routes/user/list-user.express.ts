import { Request, Response } from "express"
import { ListUserOutputDto, ListUserUseCase } from "../../../../../useCases/user/list-user/list-user.usecase"
import { HttpMethod, Route } from "../route"

export type ListUserResponseDto = {
  users: {
    id: string,
    username: string,
    password: string
  }[]
}

export class ListUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listUserService: ListUserUseCase
  ){}

  public static create(listUserService: ListUserUseCase) {
    return new ListUserRoute(
        "/list-users",
        HttpMethod.GET,
        listUserService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
        const output = await this.listUserService.execute();

        const responseBody = this.present(output);

        response.status(200).json(responseBody).send();
    };
  }

  public getPath(): string {
      return this.path;
  }

  public getMethod(): HttpMethod {
      return this.method;
  }

  private present(input: ListUserOutputDto): ListUserResponseDto {
      const response: ListUserResponseDto = {
          users: input.users.map((user) => ({
              id: user.id,
              username: user.username,
              password: user.password,
          })),
      };

      return response;
  }
}