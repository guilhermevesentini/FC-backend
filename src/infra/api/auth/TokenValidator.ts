import jwt from "jsonwebtoken";

export interface ITokenValidator {
  validate(token: string): boolean;
}

export class TokenValidator implements ITokenValidator {
  validate(token: string): boolean {
    try {
      jwt.verify(token, process.env.SECRET_KEY || "mysecretkeyfcbackend");
      return true;
    } catch (error) {
      return false;
    }
  }
}
