export type UserDto = {
  username: string
  id: string
}

export type UserInputDto = {
  email: string
  username: string
  password: string
}

export type CreateUserOutputDto = {
  id: string
}

export type FindUserInputDto = {
  username: string
}

export type FindUserOutputDto = {
  id: string,
  username: string,
  password: string
}