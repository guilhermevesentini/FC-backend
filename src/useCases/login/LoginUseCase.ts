import { Login } from "../../domain/login/entity/login"
import { LoginGateway } from "../../domain/login/gateway/LoginGateway"
import { InvalidCredentialsError } from "../../infra/api/errors/login/InvalidCredentialsError";
import { UserNotFoundError } from "../../infra/api/errors/login/UserNotFoundError";
import { UseCase } from "../usercase"
import bcrypt from 'bcryptjs';

export type LoginUserInputDto = {
  username: string
  password: string  
}

export type LoginUserOutputDto = {
  token: string,
  customerId: string
}

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