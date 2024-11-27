import { IExpense } from "../../_interfaces/IDespesas"
import { Expense } from "../entity/expense"

export interface ExpenseGateway {
  obter(): Promise<IExpense[]>
  obterDespesa(username: string): Promise<IExpense>
  obterPerMonth(username: string): Promise<IExpense[]>
  create(user: Expense): Promise<void>
  editar(username: string): Promise<IExpense | undefined>
  excluir(username: string): Promise<IExpense | undefined>
}