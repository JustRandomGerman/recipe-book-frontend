import style from '../../css/pages/CreateRecipe.module.css';
import RecipeImage from '../components/RecipeImage';
import RecipeHeading from '../components/RecipeHeading';
import RecipeIngredients from '../components/RecipeIngredients';
import RecipeInstructions from '../components/RecipeInstructions';
import RecipeTags from '../components/RecipeTags';
import { useState } from 'react';
import Recipe from './Recipe';

function CreateRecipe(){
    const emptyRecipe : Recipe = {
        id: 0,
        name: 'Recipe Name',
        keywords: [],
        image: '',
        ingredients: [],
        instructions: 'Recipe Instructions',
        tags: []
      };
    let [recipe, setRecipe] = useState<Recipe>(emptyRecipe);
    
    return(
        <div>
            <RecipeImage editing={true} image={recipe.image} setRecipe={setRecipe}/>
            <RecipeHeading editing={true} name={recipe.name} setRecipe={setRecipe} />
            <RecipeIngredients editing={true} ingredients={recipe.ingredients} setRecipe={setRecipe} />
            <RecipeInstructions editing={true} instructions={recipe.instructions} setRecipe={setRecipe} />
            <RecipeTags editing={true} tags={recipe.tags} setRecipe={setRecipe}/>
        </div>
    )
}

export default CreateRecipe;