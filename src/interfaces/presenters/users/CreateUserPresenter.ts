import { UserDto } from "../../../application/dtos/users/usersDto";


export class CreateUserPresenter {
  public list(user: UserDto): UserDto {
    return {
      id: user.id,
      username: user.username
    };
  }
}
