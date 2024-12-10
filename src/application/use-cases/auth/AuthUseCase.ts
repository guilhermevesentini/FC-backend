import jwt from "jsonwebtoken";

type AuthInputDto = {
  token?: string; // Token enviado pelo cliente para validação
};

type AuthOutputDto = {
  valid: boolean;
  token?: string; // Novo token gerado, se necessário
};

export class AuthUseCase {
  private constructor(private readonly secretKey: string) {}

  public static create(secretKey: string): AuthUseCase {
    return new AuthUseCase(secretKey);
  }

  public async execute(input: AuthInputDto): Promise<AuthOutputDto> {
    const { token } = input;

    if (token) {
      // Validar o token existente
      try {
        jwt.verify(token, this.secretKey);
        return { valid: true };
      } catch (error) {
        return { valid: false };
      }
    } else {
      // Gerar um novo token
      const newToken = jwt.sign({}, this.secretKey, { expiresIn: "1h" });
      return { valid: true, token: newToken };
    }
  }
}
