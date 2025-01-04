import { UserGateway } from "../../../infra/gateways/users/UserGateway";
import { ListUserPresenter } from "../../../interfaces/presenters/users/ListUserPresenter";
import { UserDto } from "../../dtos/usersDto";
import { UseCase } from "../UseCase";

export class ListUserUseCase implements UseCase<UserDto, UserDto[]> {
  private listUserPresenter: ListUserPresenter;

  private constructor(
    private readonly userGateway: UserGateway
  ) { this.listUserPresenter = new ListUserPresenter }

  public static create(userGateway: UserGateway){
    return new ListUserUseCase(userGateway)
  }

  public async execute(): Promise<UserDto[]> {
    const aUser = await this.userGateway.list();

    const output = this.listUserPresenter.list(aUser)

    return output
  }
}