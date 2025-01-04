import { UserGateway } from "../../../infra/gateways/users/UserGateway";
import { InvalidCredentialsError } from "../../../shared/errors/login/InvalidCredentialsError";
import { UserNotFoundError } from "../../../shared/errors/login/UserNotFoundError";
import { ChangePasswordInputDto } from "../../dtos/usersDto";
import { UseCase } from "../UseCase";
import bcrypt from 'bcryptjs';

export class ChangePasswordUseCase implements UseCase<ChangePasswordInputDto, boolean> {

  private constructor(
    private readonly userGateway: UserGateway    
  ) { }

  public static create(userGateway: UserGateway) {
    return new ChangePasswordUseCase(userGateway)
  }

  public async execute(input: ChangePasswordInputDto): Promise<boolean> {    
    const aUser = await this.userGateway.findUser(input.email);
    
    if (!aUser) throw new UserNotFoundError()

    const isPasswordValid = await bcrypt.compare(input.senha, aUser.password);

    if (!isPasswordValid) throw new InvalidCredentialsError();

    const reset = await this.userGateway.updatePassword({ email: aUser.email, password: input.novaSenha })    

    if (!reset.id) return false

    return true
  }
}
