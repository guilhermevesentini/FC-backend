export type UserDto = {
  username: string
  email: string
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
  email: string
}

export type FindUserOutputDto = {
  id: string,
  username: string,
  password: string
  email: string
}

export type RecoverPasswordInputDto = {
  email: string
}

export type UpdatePasswordInputDto = {
  email: string
  password: string
}

export type UpdatePasswordOutputDto = {
  id: string | undefined
}

export type ChangePasswordInputDto = {
  email: string
  senha: string
  novaSenha: string
}