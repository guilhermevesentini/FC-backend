import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserRepositoryPrisma } from "../../../infra/repositories/user/UserRespositoryPrisma";
import { UseCase } from "../../usercase";
import { UserGateway } from "../../../domain/usuarios/gateway/UserGateway";

export type FindUserInputDto = {
  username: string
}

export type FindUserOutputDto = {
  id: string,
  username: string,
  password: string
}

export class FindUserUseCase implements UseCase<FindUserInputDto, FindUserOutputDto | undefined> {
  private constructor(private readonly userGateway: UserGateway){}

  public static create(userGateway: UserGateway){
    return new FindUserUseCase(userGateway)
  }

  public async execute(input: FindUserInputDto): Promise<FindUserOutputDto | undefined> {    
    const aUser = await this.userGateway.findUser(input.username);
    
    const output = this.presentOutput(aUser)

    return output
  }

  private presentOutput(user: FindUserOutputDto | undefined ): FindUserOutputDto | undefined {
    if (!user) return undefined

    return {
      id: user.id,
      username: user.username,
      password: user.password
    }
  }
}
