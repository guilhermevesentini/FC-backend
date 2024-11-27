import { HttpError } from "../httpErrorsResponses";

export class UserNotFoundError extends HttpError {
  constructor() {
    super('Usuário não encontrado!', 404, 'UserNotFoundError');
  }
}



