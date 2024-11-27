import { HttpError } from "../httpErrorsResponses";

export class BadRequestError extends HttpError {
  constructor(message: string = 'Requisição inválida!') {
    super(message, 400, 'BadRequestError');
  }
}