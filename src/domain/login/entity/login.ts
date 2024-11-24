import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export type LoginProps = {
  username: string;
  password: string;
};

export class Login {
  private readonly token: string;

  constructor(
    private props: LoginProps,
    token: string
  ) {
    this.token = token;
  }

  public static generateToken(username: string): string {
    const secretKey = process.env.SECRET_KEY || 'mysecretkeyfcbackend';
    return jwt.sign({ username }, secretKey, { expiresIn: '24h' });
  }
  public static with(props: LoginProps, token: string) {
    return new Login(props, token);
  }

  public get username() {
    return this.props.username;
  }

  public get password() {
    return this.props.password;
  }

  public get tokenJwt() {
    return this.token;
  }
}
