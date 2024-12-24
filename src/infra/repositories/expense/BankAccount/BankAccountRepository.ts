import { PrismaClient } from "@prisma/client";
import { BankAccountGateway } from "../../../gateways/bankAccount/BankAccountGateway";
import { v4 as uuidv4 } from 'uuid';
import { BankAccountInputDto, BankAccountOutputDto, DeleteBankAccountInputDto, GetBankAccountInputDto } from "../../../../application/dtos/BankAccountDto";

export class BankAccountRepositoryPrisma implements BankAccountGateway {
  private constructor(private readonly prismaClient: PrismaClient){}  
       
  public static build(prismaClient: PrismaClient){
    return new BankAccountRepositoryPrisma(prismaClient)
  }
  
  public async create(input: BankAccountInputDto): Promise<BankAccountOutputDto> {
    if (input.contaPrincipal) {
      await this.prismaClient.bankAccount.updateMany({
          where: { 
              customerId: input.customerId,
              contaPrincipal: true 
          },
          data: { contaPrincipal: false }
      });
    }
    
    const account = await this.prismaClient.bankAccount.create({
      data: {
        id: uuidv4(),
        agencia: input.agencia,
        conta: input.conta,
        nome: input.nome,
        banco: input.banco,
        nomeBanco: input.nomeBanco,
        contaPrincipal: input.contaPrincipal,
        saldo: input.saldo,
        customerId: input.customerId
      }
    });

    return account
  }

  public async get(input: GetBankAccountInputDto): Promise<BankAccountOutputDto[]> {
    const account = await this.prismaClient.bankAccount.findMany({
      where: {
        customerId: input.customerId
      }
    });

    return account
  }

  public async delete(input: DeleteBankAccountInputDto): Promise<void> {
    await this.prismaClient.bankAccount.delete({
      where: {
        customerId: input.customerId,
        id: input.id
      }
    });
  }
}