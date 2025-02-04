import { UpdatePasswordInputDto, UpdatePasswordOutputDto } from "../../../application/dtos/usersDto"
import { User } from "../../../domain/entities/users/user"

export interface UserGateway {
  save(user: User): Promise<void>
  list(): Promise<User[]>
  findUser(username: string): Promise<User | undefined>
  updatePassword(input: UpdatePasswordInputDto): Promise<UpdatePasswordOutputDto>
}