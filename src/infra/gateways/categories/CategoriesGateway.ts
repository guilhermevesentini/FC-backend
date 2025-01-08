import { CategoriesDto, DeleteCategoriesInputDto, GetCategoriesInputDto, GetCategoriesOutputDto } from "../../../application/dtos/CategoriesDto"

export interface CategoriesGateway {
  create(input: CategoriesDto): Promise<void>
  edit(input: CategoriesDto): Promise<void>
  get(input: GetCategoriesInputDto): Promise<GetCategoriesOutputDto[]>
  delete(input: DeleteCategoriesInputDto): Promise<void>  
}