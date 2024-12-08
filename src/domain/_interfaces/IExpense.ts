
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
  ano: number
  valor: string
  status: string
  despesaId: string
  descricao: string  
  customerId: string
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

export type ExpensePerMonthInputDto = {
  mes: number
  ano: number
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
  meses: IExpenseMonth[];
};

export type ExpensePerMonthResponseDto = {
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


export type CreateExpenseMonthInputDto = {
  id: string
  mes: number
  despesaId: string
  ano: number
  valor: string
  status: string
  descricao: string  
  customerId: string
  vencimento: Date;
  observacao: string
};

export type CreateExpenseMonthOutputDto = {
  id: string
  mes: number
  ano: number
  despesaId: string
  valor: string
  status: string
  descricao: string  
  customerId: string
  vencimento: Date;
  observacao: string
};


export type CreateExpenseInputDto = {
  id: string;
  nome: string;
  recorrente: string
  vencimento: Date
  frequencia: string
  replicar: boolean
  customerId: string
  meses?: CreateExpenseMonthInputDto[];
};

export type CreateExpenseOutputDto = {
  id: string;
  nome: string;
  recorrente: string
  vencimento: Date
  frequencia: string
  replicar: boolean
  customerId: string
};

export type CreateExpenseResponseDto = {
  id: string
}

export type GetExpenseMonthInputDto = {
  mes: number
  ano: number
  customerId: string
};

export type ExpenseMonthOutputDto = {
  id: string
  mes: number
  despesaId: string
  ano: number
  valor: string
  status: string
  descricao: string  
  customerId: string
  vencimento: Date;
  observacao: string
};


export type GetExpenseMonthResponseDto = {
  id: string
  mes: number
  despesaId: string
  ano: number
  valor: string
  status: string
  descricao: string  
  customerId: string
  vencimento: Date;
  observacao: string
}


export type CreateExpenseMonthResponseDto = {
  id: string
  mes: number
  despesaId: string
  ano: number
  valor: string
  status: string
  descricao: string  
  customerId: string
  vencimento: Date;
  observacao: string
}


export type GetExpensePerMonthInputDto = {
  mes: number,
  ano: number,
  customerId: string
};

export type GetExpensePerMonthOutputDto = {
  id: string;
  nome: string;
  recorrente: string
  vencimento: Date
  frequencia: string
  replicar: boolean
  customerId: string
  meses: GetExpensePerMonthResponseDto[];
};

export type GetExpensePerMonthResponseDto = {
  id: string
  mes: number
  despesaId: string
  ano: number
  valor: string
  status: string
  descricao: string  
  customerId: string
  vencimento: Date;
  observacao: string
}

export type DeleteExpenseInputDto = {
  id: string
  customerId: string
  mes?: number
}

export type EditPerMonthInputDto = {
  id: string;
  nome: string;
  recorrente: string
  vencimento: Date
  frequencia: string
  replicar: boolean
  customerId: string
  meses: IExpenseMonth[];
};

export type EditPerMonthOutputDto = {
  id: string;
  nome: string;
  recorrente: string
  vencimento: Date
  frequencia: string
  replicar: boolean
  customerId: string
  meses: IExpenseMonth[];
};

export type ExpenseModelDto = {
  id: string;
  nome: string;
  recorrente: string
  vencimento: Date
  frequencia: string
  replicar: boolean
  customerId: string
  mes: number
  ano: number
  valor: string
  status: string
  despesaId: string
  descricao: string
  observacao: string
};