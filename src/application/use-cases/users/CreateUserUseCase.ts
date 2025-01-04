import { User } from "../../../domain/entities/users/user";
import { UserGateway } from "../../../infra/gateways/users/UserGateway";
import { UserPresenter } from "../../../interfaces/presenters/users/UserPresenter";
import { UserDto, UserInputDto } from "../../dtos/usersDto";
import { UseCase } from "../UseCase";

export class CreateUserUseCase implements UseCase<UserInputDto, UserDto> {
  private userPresenter: UserPresenter;
  
  private constructor(private readonly userGateway: UserGateway) {
    this.userPresenter = new UserPresenter;
  }

  public static create(userGateway: UserGateway) {
    return new CreateUserUseCase(userGateway)
  }

  public async execute({username, password, email}: UserInputDto): Promise<UserDto> {   
    const aUser = await User.create(username, password, email)

    const userExists = await this.userGateway.findUser(email)
   
    if (userExists) return this.userPresenter.user(aUser)

    await this.userGateway.save(aUser)

    const output = this.userPresenter.user(aUser);

    return output
  }
}