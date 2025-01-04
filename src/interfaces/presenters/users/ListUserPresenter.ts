import { UserDto } from "../../../application/dtos/usersDto";


export class ListUserPresenter {
  public list(users: UserDto[]): UserDto[] {
    return users.map((u) => {
      return {
        id: u.id,
        email: u.email,
        username: u.username,
      };
    });
  }
}
