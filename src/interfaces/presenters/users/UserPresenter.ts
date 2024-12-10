import { UserDto } from "../../../application/dtos/users/usersDto";

export class UserPresenter {
  public user(user: UserDto): UserDto {
    return {
        id: user.id,
        username: user.username,
      };
  }
}
