export class UserNotFoundError extends Error {
  constructor() {
    super('Usuário não encontrado!');
    this.name = 'UserNotFoundError';
  }
}
export class InvalidCredentialsError extends Error {
  constructor() {
    super('Sua senha está incorreta!');
    this.name = 'InvalidCredentialsError';
  }
}