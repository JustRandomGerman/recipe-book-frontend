export interface Recipe{
    id: number
    name: string
    keywords: Keyword[]
    image_paths: ImagePath[]
    ingredient_groups: IngredientGroup[]
    instructions: string,
    tags: Tag[]
    collections: Collection[],
    last_viewed: Date
}