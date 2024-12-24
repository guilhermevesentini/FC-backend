export type BankAccountInputDto = {
  id: string
  banco: number
  nomeBanco: string
  contaPrincipal: boolean
  nome: string
  conta: string
  agencia: string
  saldo: string
  customerId: string
}

export type BankAccountOutputDto = {
  id: string
  banco: number
  nomeBanco: string
  contaPrincipal: boolean
  nome: string
  conta: string
  agencia: string
  saldo: string
  customerId: string
}

export type GetBankAccountInputDto = {
  customerId: string
}

export type DeleteBankAccountInputDto = {
  customerId: string
  id: string
}

export type GetBankAccountOutDto = BankAccountOutputDto[]