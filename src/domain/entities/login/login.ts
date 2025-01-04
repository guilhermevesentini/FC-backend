import jwt from 'jsonwebtoken';

export type LoginProps = {
  email: string;
  username?: string
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

  public get email() {
    return this.props.email;
  }

  public get username() {
    return this.props.username || undefined;
  }

  public get password() {
    return this.props.password;
  }

  public get tokenJwt() {
    return this.token;
  }
}
