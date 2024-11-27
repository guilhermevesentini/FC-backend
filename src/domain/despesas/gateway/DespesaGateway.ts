import { IDespesa } from "../../_interfaces/IDespesas"
import { Despesa } from "../entity/despesa"

export interface DespesaGateway {
  obter(): Promise<IDespesa[]>
  obterDespesa(username: string): Promise<IDespesa>
  obterPerMonth(username: string): Promise<IDespesa[]>
  criar(user: Despesa): Promise<void>
  editar(username: string): Promise<IDespesa | undefined>
  excluir(username: string): Promise<IDespesa | undefined>
}