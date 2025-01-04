import { FindUserOutputDto } from "../../../application/dtos/usersDto";

export class FindUserPresenter {
  public user(user: FindUserOutputDto): FindUserOutputDto {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password
    };
  }
}
