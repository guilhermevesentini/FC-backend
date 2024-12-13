import { Request, Response } from "express"
import { HttpMethod, Route } from "../route"
import { AuthMiddleware } from "../../auth/AuthMiddleware"
import { ListUserUseCase } from "../../../../application/use-cases/users/list/ListUsersUseCase"
import { ListUserPresenter } from "../../../../interfaces/presenters/users/ListUserPresenter"

export class ListUserRoute implements Route {
  private listUserPresenter: ListUserPresenter;
  
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listUserService: ListUserUseCase,
    private readonly authMiddleware: AuthMiddleware
  ) { this.listUserPresenter = new ListUserPresenter }

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

        const responseBody = this.listUserPresenter.list(output);

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
}