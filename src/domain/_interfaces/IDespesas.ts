
export type IDespesa = {
  id: string;
  nome: string;
  recorrente: boolean
  vencimento: Date
  frequencia: string
  replicar: boolean
  customerId: string
};

export type IDespesaMes = {
  mes: number;
  ano: number
  valor: string
  status: string
  descricao: string  
  despesaId: string | null
  vencimento: Date;
  observacao: string
};