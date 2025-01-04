import { UserGateway } from "../../../infra/gateways/users/UserGateway";
import { EmailService } from "../../../infra/services/EmailService";
import { generateRandomPassword } from "../../../shared/utils/hashUtils";
import { RecoverPasswordInputDto } from "../../dtos/usersDto";
import { UseCase } from "../UseCase";

export class RecoverPasswordUseCase implements UseCase<RecoverPasswordInputDto, boolean> {
  private readonly emailService: EmailService

  private constructor(
    private readonly userGateway: UserGateway    
  ) { this.emailService =  new EmailService  }

  public static create(userGateway: UserGateway){
    return new RecoverPasswordUseCase(userGateway)
  }

  public async execute(input: RecoverPasswordInputDto): Promise<boolean> {    
    const aUser = await this.userGateway.findUser(input.email);
    
    if (!aUser) {
      throw Error('Usuário não encontrado')
    }

    const generatedPassword = generateRandomPassword()

    await this.emailService.sendPasswordResetEmail(aUser.email, generatedPassword);

    const reset = await this.userGateway.updatePassword({ email: aUser.email, password: generatedPassword })    

    if (!reset.id) return false

    return true
  }
}
