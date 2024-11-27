
export type IExpense = {
  id: string;
  name: string;
  recurring: boolean
  dueDate: Date
  frequency: string
  replicate: boolean
  customerId: string
};

export type IExpenseMonth = {
  mes: number;
  ano: number
  valor: string
  status: string
  descricao: string  
  expenseId: string | null
  vencimento: Date;
  observacao: string
};