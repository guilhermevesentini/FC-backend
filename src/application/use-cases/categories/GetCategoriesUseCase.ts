import { CategoriesGateway } from "../../../infra/gateways/categories/CategoriesGateway";
import { GetCategoriesInputDto, GetCategoriesOutputDto } from "../../dtos/CategoriesDto";
import { UseCase } from "../UseCase";

export class GetCategoryUseCase implements UseCase<GetCategoriesInputDto, GetCategoriesOutputDto[]>{
  private constructor(
    private readonly categoriesGateway: CategoriesGateway
  ) {}

  public static create(
    categoriesGateway: CategoriesGateway
  ): GetCategoryUseCase {
    return new GetCategoryUseCase(categoriesGateway);
  }

  public async execute(input: GetCategoriesInputDto): Promise<GetCategoriesOutputDto[]> {
    let categories: GetCategoriesOutputDto[] = []
    try {
      categories = await this.categoriesGateway.get(input)
    } catch (err) {
      console.log(err)
    }  

    return categories
  }
}