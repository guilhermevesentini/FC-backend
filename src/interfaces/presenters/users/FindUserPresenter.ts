import { FindUserOutputDto } from "../../../application/dtos/users/usersDto";

export class FindUserPresenter {
  public user(user: FindUserOutputDto): FindUserOutputDto {
    return {
        id: user.id,
        username: user.username,
        password: user.password
    };
  }
}
