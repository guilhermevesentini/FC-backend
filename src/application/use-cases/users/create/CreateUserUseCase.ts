import { User } from "../../../../domain/entities/users/user"
import { UserGateway } from "../../../../infra/gateways/users/UserGateway"
import { CreateUserOutputDto, UserDto, UserInputDto } from "../../../dtos/usersDto"
import { UseCase } from "../../UseCase"
import { UserPresenter } from "../../../../interfaces/presenters/users/UserPresenter";

export class CreateUserUseCase implements UseCase<UserInputDto, UserDto> {
  private userPresenter: UserPresenter;
  
  private constructor(private readonly userGateway: UserGateway) {
    this.userPresenter = new UserPresenter;
  }

  public static create(userGateway: UserGateway) {
    return new CreateUserUseCase(userGateway)
  }

  public async execute({username, password}: UserInputDto): Promise<UserDto> {   
    const aUser = await User.create(username, password)

    const userExists = await this.userGateway.findUser(username)
   
    if (userExists) return this.userPresenter.user(aUser)

    await this.userGateway.save(aUser)

    const output = this.userPresenter.user(aUser);

    return output
  }
}