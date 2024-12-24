export type IncomeDto = {
  id: string;
  nome: string;
  recorrente: string
  recebimento: Date
  customerId: string
  frequencia: string
  replicar: boolean
  meses?: IncomeMonthDto[];
}

export type IncomeMonthDto = {
  id: string
  mes: number
  ano: number
  valor: string
  status: string
  incomeId: string
  descricao: string  
  customerId: string
  recebimento: Date
  observacao: string
  categoria: string
  contaId: string
}

export type IncomeInputDto = {
  id: string;
  nome: string;
  recorrente: string
  recebimento: Date
  customerId: string
  frequencia: string
  replicar: boolean  
  mes: number
  ano: number
  valor: string
  status: string
  incomeId: string
  descricao: string
  observacao: string
  categoria: string
  contaId: string
}

export type IncomeOutputDto = IncomeInputDto

export type GetIncomeInputDto = {
  mes: number
  ano: number
  customerId: string
}

export type GetIncomeOutputDto = IncomeOutputDto[]