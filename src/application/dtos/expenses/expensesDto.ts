import { CreateExpenseMonthOutputDto } from "../../../domain/interfaces/IExpense"

export type CreateExpenseMonthInputDto = {
  mes: CreateExpenseMonthOutputDto[]
  customerId: string
  despesaId: string
}

export type ExpenseDto = {
  id: string;
  nome: string;
  recorrente: string
  vencimento: Date
  customerId: string
  frequencia: string
  replicar: boolean
}

export type ExpenseMonthDto = {
  id: string
  mes: number
  ano: number
  valor: string
  status: string
  despesaId: string
  descricao: string  
  customerId: string
  vencimento: Date;
  observacao: string
}

export type ExpenseModelDto = ExpenseDto & ExpenseMonthDto;