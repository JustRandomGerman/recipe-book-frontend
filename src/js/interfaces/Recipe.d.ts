export interface Recipe{
    id: number,
    name: string,
    keywords: Keyword[],
    image_paths: ImagePath[],
    ingredients: Ingredient[],
    instructions: string,
    tags: Tag[]
}