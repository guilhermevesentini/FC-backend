import { ETipoCategory } from "../../@types/enums"

export type CategoriesDto = {
  id: string
  nome: string
  tipo: ETipoCategory
  color: string
  customerId: string
}

export type GetCategoriesInputDto = {
  customerId: string
  tipo?: ETipoCategory
}

export type GetCategoriesOutputDto = {
  id: string
  nome: string
  color: string
  customerId: string
}

export type DeleteCategoriesInputDto = {
  id: string
  tipo: ETipoCategory
}