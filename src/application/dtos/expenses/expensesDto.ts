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
  meses?: ExpenseMonthDto[];
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

export type GetExpensePerMonthInputDto = {
  mes: number,
  ano: number,
  customerId: string
};

export type ExpensePerMonthOutputDto = {
  id: string;
  nome: string;
  recorrente: string
  vencimento: Date
  frequencia: string
  replicar: boolean
  customerId: string  
};