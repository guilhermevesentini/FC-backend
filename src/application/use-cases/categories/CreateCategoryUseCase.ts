import { Categories } from "../../../domain/entities/categories/Categories";
import { CategoriesGateway } from "../../../infra/gateways/categories/CategoriesGateway";
import { CategoriesDto } from "../../dtos/CategoriesDto";
import { UseCase } from "../UseCase";

export class CreateCategoryUseCase implements UseCase<CategoriesDto, CategoriesDto>{
  //private expensePresenter: ExpensePresenter

  private constructor(
    private readonly categoriesGateway: CategoriesGateway
  ) {
    //this.expensePresenter = new ExpensePresenter    
  }

  public static create(
    categoriesGateway: CategoriesGateway
  ): CreateCategoryUseCase {
    return new CreateCategoryUseCase(categoriesGateway);
  }

  public async execute(input: CategoriesDto): Promise<CategoriesDto> {
    const aCategory = Categories.create(input);

    try {
      await this.categoriesGateway.create(aCategory)
    } catch (err) {
      console.log(err)
    } finally {
      const output: CategoriesDto = {
        id: aCategory.id,
        nome: aCategory.nome,
        tipo: aCategory.tipo,
        customerId: aCategory.customerId
      }

    return output
    }    
  }
}