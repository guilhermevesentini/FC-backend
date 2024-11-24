import { Login } from "../entity/login";

export interface LoginGateway {
  validateUser(username: string): Promise<{ username: string, password: string } | undefined>
}
