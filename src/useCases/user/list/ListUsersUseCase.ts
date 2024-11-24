import {User} from "../../../domain/usuarios/entity/user"
import { UserGateway } from "../../../domain/usuarios/gateway/UserGateway"
import { UseCase } from "../../usercase"

export type ListUserInputDto = void

export type ListUserOutputDto = {
  users: {
    id: string,
    username: string,
    password: string
  }[]
}

export class ListUserUseCase implements UseCase<ListUserInputDto, ListUserOutputDto> {
  private constructor(private readonly userGateway: UserGateway){}

  public static create(userGateway: UserGateway){
    return new ListUserUseCase(userGateway)
  }

  public async execute(): Promise<ListUserOutputDto> {
    const aUser = await this.userGateway.list();

    const output = this.presentOutput(aUser)

    return output
  }

  private presentOutput(users: User[]): ListUserOutputDto{
    return {
      users: users.map((u) => {
        return {
          id: u.id,
          username: u.username,
          password: u.password
        }
      })
    }
  }
}