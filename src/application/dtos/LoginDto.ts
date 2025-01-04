export type LoginDto = {
  email: string
  password: string  
}

export type LoginUserInputDto = {
  token: string,
  customerId: string
}

export type LoginUserOutputDto = {
  token: string,
  customerId: string
}