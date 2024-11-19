import { PrismaClient } from "@prisma/client";
import { User } from "../../../domain/usuarios/entity/user";
import { UserGateway } from "../../../domain/usuarios/gateway/usuario.gateway";

export class UserRepositoryPrisma implements UserGateway {

  private constructor(private readonly prismaClient: PrismaClient){}

  public static create(prismaClient: PrismaClient){
    return new UserRepositoryPrisma(prismaClient)
  }

  //modelar para o banco
  public async save(user: User): Promise<void> {
    const data = {
      id: user.id,
      username: user.username,
      password: user.password
    }

    await this.prismaClient.user.create({
      data
    })
  }

  //modelar do banco para o sistema
  public async list(): Promise<User[]> {    
    const users  = await this.prismaClient.user.findMany();

    const userList = users.map((u) => {
      const user = User.with({
        id: u.id,
        username: u.username,
        password: u.password
      })

      return user
    })

    return userList
  }  
}