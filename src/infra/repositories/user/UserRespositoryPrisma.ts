import { PrismaClient } from "@prisma/client";
import { User } from "../../../domain/entities/users/user";
import bcrypt from "bcryptjs";
import { UserGateway } from "../../gateways/users/UserGateway";
import { UpdatePasswordInputDto, UpdatePasswordOutputDto } from "../../../application/dtos/usersDto";

export class UserRepositoryPrisma implements UserGateway {
  
  private constructor(private readonly prismaClient: PrismaClient){}

  public static create(prismaClient: PrismaClient){
    return new UserRepositoryPrisma(prismaClient)
  }

  //modelar para o banco
  public async save(user: User): Promise<void> {
    const generateId = await bcrypt.hash(user.password, 10);
    
    const data = {
      id: user.id,
      username: user.username,
      email: user.email,
      password: generateId
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
        email: u.email,
        username: u.username,
        password: u.password
      })

      return user
    })

    return userList
  }  

  public async findUser(email: string): Promise<User | undefined> {    
    const userData = await this.prismaClient.user.findUnique({
      where: { 
        email
       }
    });

    if (!userData) return

    const user = User.with({
      id: userData?.id,
      email: userData.email,
      password: userData?.password,
      username: userData?.username
    });

    return user
  } 

  public async updatePassword(input: UpdatePasswordInputDto): Promise<UpdatePasswordOutputDto> {
      const userData = await this.prismaClient.user.findUnique({
        where: { 
          email: input.email
        }
      });
    
    if (!userData) return { id: undefined } 

    const password = await bcrypt.hash(input.password, 10)
    
    await this.prismaClient.user.update({
      where: { email: userData.email },
      data: { password: password },
    });

    return { id: userData.id }
  }
}