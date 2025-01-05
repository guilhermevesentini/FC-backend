import { CategoriesGateway } from "../../../infra/gateways/categories/CategoriesGateway";
import { DeleteCategoriesInputDto } from "../../dtos/CategoriesDto";
import { UseCase } from "../UseCase";

export class DeleteCategoryUseCase implements UseCase<DeleteCategoriesInputDto, boolean>{
  //private expensePresenter: ExpensePresenter

  private constructor(
    private readonly categoriesGateway: CategoriesGateway
  ) {
    //this.expensePresenter = new ExpensePresenter    
  }

  public static create(
    categoriesGateway: CategoriesGateway
  ): DeleteCategoryUseCase {
    return new DeleteCategoryUseCase(categoriesGateway);
  }

  public async execute(input: DeleteCategoriesInputDto): Promise<boolean> {
    let response: boolean = false

    try {
      await this.categoriesGateway.delete(input)
      response = true
    } catch (err) {
      response = false
    }  

    return response
  }
}