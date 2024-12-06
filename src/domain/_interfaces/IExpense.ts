
export type IExpense = {
  id: string;
  nome: string;
  recorrente: string
  vencimento: Date
  frequencia: string
  replicar: boolean
  customerId: string
};

export type IExpenseMonth = {
  id: string
  mes: number
  despesaId: string
  ano: number
  valor: string
  status: number
  descricao: string  
  customerId: string | null
  vencimento: Date;
  observacao: string
};

export type IExpensePerMonth = {
  id: string;
  nome: string;
  recorrente: string
  vencimento: Date
  frequencia: string
  replicar: boolean
  customerId: string
  meses: IExpenseMonth[]
};