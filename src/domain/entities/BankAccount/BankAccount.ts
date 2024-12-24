import { BankAccountInputDto, BankAccountOutputDto } from "../../../application/dtos/BankAccountDto";

export class BankAccount {  
  constructor(
    private props: BankAccountOutputDto
  ) {
  }

  public static create(input: BankAccountInputDto): BankAccountOutputDto {
    const props: BankAccountOutputDto = {
      agencia: input.agencia,
      conta: input.conta,
      nome: input.nome,
      banco: input.banco,
      nomeBanco: input.nomeBanco,
      contaPrincipal: input.contaPrincipal,
      saldo: input.saldo,
      id: input.id,
      customerId: input.customerId
    };

    return props;
  }
  
  public static with(props: BankAccountInputDto): BankAccountOutputDto {
    return props;
  }

  public get expense() {
    return this.props;
  }
}