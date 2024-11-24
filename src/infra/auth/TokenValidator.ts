import jwt from "jsonwebtoken";
import { ITokenValidator } from "../../domain/interfaces/ITokenValidator";

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
