import {User} from "../entity/user";

export interface UserGateway {
  save(user: User): Promise<void>
  list(): Promise<User[]>
  findUser(username: string): Promise<User | undefined>
}