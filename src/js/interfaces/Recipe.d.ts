export interface Recipe{
    id: number,
    name: string,
    image: string,
    ingredients: Ingredient[],
    instructions: string,
    tags: Tag[]
}