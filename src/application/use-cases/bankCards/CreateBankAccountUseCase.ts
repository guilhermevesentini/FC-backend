import { BankAccount } from "../../../domain/entities/BankAccount/BankAccount";
import { BankAccountGateway } from "../../../infra/gateways/bankAccount/BankAccountGateway";
import { BankAccountInputDto, BankAccountOutputDto } from "../../dtos/BankAccountDto";
import { UseCase } from "../UseCase";

export class CreateBankAccountUseCase implements UseCase<BankAccountInputDto, BankAccountOutputDto>{
  //private expensePresenter: ExpensePresenter

  private constructor(
    private readonly bankAccountGateway: BankAccountGateway
  ) {
    //this.expensePresenter = new ExpensePresenter    
  }

  public static create(
    bankAccountGateway: BankAccountGateway
  ): CreateBankAccountUseCase {
    return new CreateBankAccountUseCase(bankAccountGateway);
  }

  public async execute(input: BankAccountInputDto): Promise<BankAccountOutputDto> {
    const aAccount = BankAccount.create(input);

    const response = await this.bankAccountGateway.create(aAccount)

    //const output: ExpenseDto = this.expensePresenter.expense(response)

    const output: BankAccountOutputDto = {
      id: response.id,
      banco: response.banco,
      nomeBanco: response.nomeBanco,
      contaPrincipal: response.contaPrincipal,
      agencia: response.agencia,
      conta: response.conta,
      nome: response.nome,
      saldo: response.saldo,
      customerId: response.customerId
    }

    return output
  }
}