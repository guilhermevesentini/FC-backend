import { HttpError } from "../httpErrorsResponses";

export class UnauthorizedError extends HttpError {
  constructor() {
    super('Acesso não autorizado!', 403, 'UnauthorizedError');
  }
}