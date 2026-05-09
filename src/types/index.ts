export interface Ingredient {
  name:string
}
export interface SingleCocktail {
  id:number,
  name:string,
  glass:string,
  category:string,
  instructions:string,
  alcoholic:boolean,
  imageUrl:string,
  ingredients:Ingredient[]
}

export interface CocktailProps {
  dane:SingleCocktail[],
  favoriteIds:number[],
  onToggleFavorite:(cocktailId:number)=>void
}

export interface HeaderProps {
  name:string,
  setName:(value:string)=>void,
  pages:number[]
}