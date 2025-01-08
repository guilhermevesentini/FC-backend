import { Categories } from "../../../domain/entities/categories/Categories";
import { CategoriesGateway } from "../../../infra/gateways/categories/CategoriesGateway";
import { CategoriesDto } from "../../dtos/CategoriesDto";
import { UseCase } from "../UseCase";

export class EditCategoryUseCase implements UseCase<CategoriesDto, CategoriesDto>{
  //private expensePresenter: ExpensePresenter

  private constructor(
    private readonly categoriesGateway: CategoriesGateway
  ) {
    //this.expensePresenter = new ExpensePresenter    
  }

  public static create(
    categoriesGateway: CategoriesGateway
  ): EditCategoryUseCase {
    return new EditCategoryUseCase(categoriesGateway);
  }

  public async execute(input: CategoriesDto): Promise<CategoriesDto> {
    const aCategory = Categories.create(input);

    try {
      await this.categoriesGateway.edit(aCategory)
    } catch (err) {
      console.log(err)
    } finally {
      const output: CategoriesDto = {
        id: aCategory.id,
        nome: aCategory.nome,
        color: aCategory.color,
        tipo: aCategory.tipo,
        customerId: aCategory.customerId
      }

    return output
    }    
  }
}