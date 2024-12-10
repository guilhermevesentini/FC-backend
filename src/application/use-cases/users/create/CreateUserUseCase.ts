import { User } from "../../../../domain/entities/users/user"
import { UserGateway } from "../../../../infra/gateways/users/UserGateway"
import { UseCase } from "../../UseCase"

export type CreateUserInputDto = {
  username: string
  password: string
}

export type CreateUserOutputDto = {
  id: string
}

export class CreateUserUseCase implements UseCase<CreateUserInputDto, CreateUserOutputDto> {

  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway) {
    return new CreateUserUseCase(userGateway)
  }

  public async execute({username, password}: CreateUserInputDto): Promise<CreateUserOutputDto> {   
    const aUser = await User.create(username, password)

    const userExists = await this.userGateway.findUser(username)

    if(userExists) return this.presentOutput(aUser)

    await this.userGateway.save(aUser)

    const output: CreateUserOutputDto = this.presentOutput(aUser)

    return output
  }

  private presentOutput(user: User): CreateUserOutputDto {
    const output: CreateUserOutputDto = {
      id: user.id
    }

    return output
  }
}