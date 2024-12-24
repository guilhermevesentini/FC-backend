import { BankAccount } from "../../../domain/entities/BankAccount/BankAccount";
import { BankAccountGateway } from "../../../infra/gateways/bankAccount/BankAccountGateway";
import { BankAccountOutputDto, DeleteBankAccountInputDto, GetBankAccountInputDto } from "../../dtos/BankAccountDto";
import { UseCase } from "../UseCase";

export class DeleteBankAccountUseCase implements UseCase<DeleteBankAccountInputDto, void>{
  //private expensePresenter: ExpensePresenter

  private constructor(
    private readonly bankAccountGateway: BankAccountGateway
  ) {
    //this.expensePresenter = new ExpensePresenter    
  }

  public static create(
    bankAccountGateway: BankAccountGateway
  ): DeleteBankAccountUseCase {
    return new DeleteBankAccountUseCase(bankAccountGateway);
  }

  public async execute(input: DeleteBankAccountInputDto): Promise<void> {
    return await this.bankAccountGateway.delete({ customerId: input.customerId, id: input.id })
  }
}