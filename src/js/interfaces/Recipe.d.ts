export interface Recipe{
    id: number,
    name: string,
    keywords: Keyword[],
    image: string,
    ingredients: Ingredient[],
    instructions: string,
    tags: Tag[]
}