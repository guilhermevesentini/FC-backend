import bcrypt from 'bcryptjs';
import { UseCase } from '../UseCase';
import { LoginGateway } from '../../../infra/gateways/login/LoginGateway';
import { Login } from '../../../domain/entities/login/login';
import { UserNotFoundError } from '../../../shared/errors/login/UserNotFoundError';
import { InvalidCredentialsError } from '../../../shared/errors/login/InvalidCredentialsError';
import { LoginDto, LoginUserOutputDto } from '../../dtos/LoginDto';
import { LoginPresenter } from '../../../interfaces/presenters/login/LoginPresenter';

export class LoginUserUseCase implements UseCase<LoginDto, LoginUserOutputDto> {
  private loginPresenter: LoginPresenter

  private constructor(
    private readonly loginGateway: LoginGateway
  ) {
    this.loginPresenter = new LoginPresenter
  }

  public static create(
    loginGateway: LoginGateway
  ): LoginUserUseCase {
    return new LoginUserUseCase(loginGateway);
  }

  public async execute(input: LoginDto): Promise<LoginUserOutputDto> {
    const userFromDb = await this.loginGateway.validateUser(input.username);
     
    if (!userFromDb) throw new UserNotFoundError();
    
    const isPasswordValid = await bcrypt.compare(input.password, userFromDb.password);

    if (!isPasswordValid) throw new InvalidCredentialsError();
  
    const token = Login.generateToken(input.username);

    const output: LoginUserOutputDto = {
      token: token,
      customerId: userFromDb.customerId
    }

    return this.loginPresenter.login(output);
  }
}