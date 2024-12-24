import { BankAccount } from "../../../domain/entities/BankAccount/BankAccount";
import { BankAccountGateway } from "../../../infra/gateways/bankAccount/BankAccountGateway";
import { BankAccountOutputDto, GetBankAccountInputDto } from "../../dtos/BankAccountDto";
import { UseCase } from "../UseCase";

export class GetBankAccountUseCase implements UseCase<GetBankAccountInputDto, BankAccountOutputDto[]>{
  //private expensePresenter: ExpensePresenter

  private constructor(
    private readonly bankAccountGateway: BankAccountGateway
  ) {
    //this.expensePresenter = new ExpensePresenter    
  }

  public static create(
    bankAccountGateway: BankAccountGateway
  ): GetBankAccountUseCase {
    return new GetBankAccountUseCase(bankAccountGateway);
  }

  public async execute(input: GetBankAccountInputDto): Promise<BankAccountOutputDto[]> {
    const response = await this.bankAccountGateway.get({ customerId: input.customerId })

    const aAccount = response.map((acc) => BankAccount.create(acc));

    //const output: ExpenseDto = this.expensePresenter.expense(response)

    //const output: BankAccountOutputDto[] =  aAccount.map((acc) => )

    return aAccount
  }
}