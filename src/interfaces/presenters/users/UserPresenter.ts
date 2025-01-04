import { UserDto } from "../../../application/dtos/usersDto";

export class UserPresenter {
  public user(user: UserDto): UserDto {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  }
}
