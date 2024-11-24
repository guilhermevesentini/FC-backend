import { Request, Response } from "express"
import { ListUserOutputDto, ListUserUseCase } from "../../../../../useCases/user/list/ListUsersUseCase"
import { HttpMethod, Route } from "../route"
import { AuthMiddleware } from "../../../../auth/AuthMiddleware"

export type ListUserResponseDto = {
  users: {
    id: string,
    username: string
  }[]
}

export class ListUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listUserService: ListUserUseCase,
    private readonly authMiddleware: AuthMiddleware
  ){}

  public static create(listUserService: ListUserUseCase, authMiddleware: AuthMiddleware) {
    return new ListUserRoute(
        "/list-users",
        HttpMethod.GET,
        listUserService,
        authMiddleware
    );
  }

  public getHandler() {
    return [
      this.authMiddleware.handle.bind(this.authMiddleware),
      async (request: Request, response: Response) => {
        const output = await this.listUserService.execute();

        const responseBody = this.present(output);

        response.status(200).json(responseBody).send();
      }
    ]
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
              username: user.username
          })),
      };

      return response;
  }
}