import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { LoginGateway } from "../../gateways/login/LoginGateway";
import { Login } from "../../../domain/entities/login/login";

export class LoginRepositoryPrisma implements LoginGateway {
  private constructor(private readonly prismaClient: PrismaClient){}

  public static create(prismaClient: PrismaClient){
    return new LoginRepositoryPrisma(prismaClient)
  }

  public async handle(login: Login): Promise<void> {
    const hashedPassword = await bcrypt.hash(login.password, 10);
    
    if (!login.username) {
      throw new Error("Obrigatório o nome de usuário")
    }

    const data = {
      email: login.email,
      username: login.username,
      password: hashedPassword
    }

    await this.prismaClient.user.create({
      data
    })
  }

  public async validateUser(email: string): Promise<{ username: string, email: string, password: string, customerId: string } | undefined> {
    const userData = await this.prismaClient.user.findUnique({
      where: { email }
    });    

    if (!userData) return
        
    return {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      customerId: userData.id
    };
  }
}