
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
  id: string
  month: number;
  year: number
  value: string
  status: number
  description: string  
  customerId: string | null
  dueDate: Date;
  comment: string
};