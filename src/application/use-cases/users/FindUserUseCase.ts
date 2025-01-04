import { UserGateway } from "../../../infra/gateways/users/UserGateway";
import { FindUserPresenter } from "../../../interfaces/presenters/users/FindUserPresenter";
import { FindUserInputDto, FindUserOutputDto } from "../../dtos/usersDto";
import { UseCase } from "../UseCase";

export class FindUserUseCase implements UseCase<FindUserInputDto, FindUserOutputDto | undefined> {

  private findUserPresenter: FindUserPresenter

  private constructor(private readonly userGateway: UserGateway){
    this.findUserPresenter = new FindUserPresenter
  }

  public static create(userGateway: UserGateway){
    return new FindUserUseCase(userGateway)
  }

  public async execute(input: FindUserInputDto): Promise<FindUserOutputDto> {    
    const aUser = await this.userGateway.findUser(input.username);
    
    if (!aUser) {
      throw Error('Usuário não encontrado')
    }

    const output = this.findUserPresenter.user(aUser)

    return output
  }
}
