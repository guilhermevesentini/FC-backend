import { BankAccountInputDto, BankAccountOutputDto, DeleteBankAccountInputDto, GetBankAccountInputDto } from "../../../application/dtos/BankAccountDto"


export interface BankAccountGateway {
  create(input: BankAccountInputDto): Promise<BankAccountOutputDto>
  get(input: GetBankAccountInputDto): Promise<BankAccountOutputDto[]>
  delete(input: DeleteBankAccountInputDto): Promise<void>
}