export type LoginUserInputDto = {
  username: string
  password: string  
}

export type LoginUserOutputDto = {
  token: string,
  customerId: string
}