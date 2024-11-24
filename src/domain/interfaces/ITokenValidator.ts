export interface ITokenValidator {
  validate(token: string): boolean;
}
