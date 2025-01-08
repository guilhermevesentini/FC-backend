import { CategoriesDto } from "../../../application/dtos/CategoriesDto";

export class Categories {  
  constructor(
    private props: CategoriesDto
  ) {
  }

  public static create(input: CategoriesDto): CategoriesDto {
    const props: CategoriesDto = {
      id: input.id,
      nome: input.nome,
      color: input.color,
      tipo: input.tipo,
      customerId: input.customerId
    };

    return props;
  }
  
  public static with(props: CategoriesDto): CategoriesDto {
    return props;
  }

  public get category() {
    return this.props;
  }
}