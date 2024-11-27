import { PrismaClient } from "@prisma/client";
import { DespesaGateway } from "../../../domain/despesas/gateway/DespesaGateway";
import { Despesa } from "../../../domain/despesas/entity/despesa";
import { IDespesa } from "../../../domain/_interfaces/IDespesas";
import { v4 as uuidv4 } from 'uuid';

export class CriarDespesaRepositoryPrisma implements DespesaGateway {

  private constructor(private readonly prismaClient: PrismaClient){}
  
  public static create(prismaClient: PrismaClient){
    return new CriarDespesaRepositoryPrisma(prismaClient)
  }

  //modelar para o banco
  public async criar(despesa: Despesa): Promise<void> {
    const data = {
      id: uuidv4(),
      nome: despesa.despesa.nome,
      recorrente: despesa.despesa.recorrente,
      vencimento: despesa.despesa.vencimento,
      frequencia: despesa.despesa.frequencia,
      replicar: despesa.despesa.replicar,
      customerId: despesa.despesa.customerId,
    }

    console.log('data', data);    

    await this.prismaClient.despesas.create({
      data
    })
  }

  obter(): Promise<IDespesa[]> {
    throw new Error("Method not implemented.");
  }
  obterDespesa(username: string): Promise<IDespesa> {
    throw new Error("Method not implemented.");
  }
  obterPerMonth(username: string): Promise<IDespesa[]> {
    throw new Error("Method not implemented.");
  }
  editar(username: string): Promise<IDespesa | undefined> {
    throw new Error("Method not implemented.");
  }
  excluir(username: string): Promise<IDespesa | undefined> {
    throw new Error("Method not implemented.");
  }
}