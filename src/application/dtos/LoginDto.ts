export type LoginDto = {
  username: string
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