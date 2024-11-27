import { HttpError } from "../httpErrorsResponses";

export class InvalidCredentialsError extends HttpError {
  constructor() {
    super('Sua senha está incorreta!', 401, 'InvalidCredentialsError');
  }
}