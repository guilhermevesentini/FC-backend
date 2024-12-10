import bcrypt from 'bcryptjs';
import { UseCase } from '../UseCase';
import { LoginGateway } from '../../../infra/gateways/login/LoginGateway';
import { Login } from '../../../domain/entities/login/login';
import { UserNotFoundError } from '../../../shared/errors/login/UserNotFoundError';
import { InvalidCredentialsError } from '../../../shared/errors/login/InvalidCredentialsError';
import { LoginUserInputDto, LoginUserOutputDto } from '../../dtos/login/loginDto';

export class LoginUserUseCase implements UseCase<LoginUserInputDto, LoginUserOutputDto> {
  private constructor(
    private readonly loginGateway: LoginGateway
  ) {}

  public static create(
    loginGateway: LoginGateway
  ): LoginUserUseCase {
    return new LoginUserUseCase(loginGateway);
  }

  public async execute(input: LoginUserInputDto): Promise<LoginUserOutputDto> {
    const userFromDb = await this.loginGateway.validateUser(input.username);
     
    if (!userFromDb) throw new UserNotFoundError();
    
    const isPasswordValid = await bcrypt.compare(input.password, userFromDb.password);

    if (!isPasswordValid) throw new InvalidCredentialsError();
  
    const token = Login.generateToken(input.username);

    return this.presentOutput(token, userFromDb.customerId);
  }

  private presentOutput(token: string, customerId: string): LoginUserOutputDto {
    return { token, customerId };
  }
}