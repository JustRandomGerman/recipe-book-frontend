import style from '../../css/pages/CreateRecipe.module.css';
import RecipeImage from '../components/RecipeImage';
import RecipeHeading from '../components/RecipeHeading';
import RecipeIngredients from '../components/RecipeIngredients';
import RecipeInstructions from '../components/RecipeInstructions';
import RecipeTags from '../components/RecipeTags';
import { useState } from 'react';
import Recipe from './Recipe';
import RecipeKeywords from '../components/RecipeKeywords';
import axios from 'axios';

function CreateRecipe(){
    const emptyRecipe : Recipe = {
        id: 0,
        name: 'Recipe Name',
        keywords: [],
        image_paths: [{path: ''}],
        ingredients: [],
        instructions: 'Recipe Instructions',
        tags: []
      };
    let [recipe, setRecipe] = useState<Recipe>(emptyRecipe);
    let [error, setError] = useState<string>();

    function save(){
        axios.post<Recipe>('http://localhost:3000/recipes', {
            name: recipe?.name,
            keywords: recipe?.keywords,
            instructions: recipe?.instructions,
            ingredients: recipe?.ingredients,
            tags: recipe?.tags,
            image_paths: recipe?.image_paths
        }).then((response) => {
            //TODO redirect to recipe page
        }).catch((error) => {
            const details = error.response.data.message.details.map((detail : any) => `${detail.message}\n`)
            setError(`${error.response.status} - ${details}`)
        })
    }
    
    return(
        <div className={style.create_recipe}>
            <RecipeImage editing={true} image_paths={recipe.image_paths} setRecipe={setRecipe}/>
            <p className='error'>{error}</p>
            <RecipeHeading editing={true} name={recipe.name} setRecipe={setRecipe} />
            <RecipeKeywords editing={true} keywords={recipe.keywords} setRecipe={setRecipe} />
            <RecipeIngredients editing={true} ingredients={recipe.ingredients} setRecipe={setRecipe} />
            <RecipeInstructions editing={true} instructions={recipe.instructions} setRecipe={setRecipe} />
            <RecipeTags editing={true} tags={recipe.tags} setRecipe={setRecipe}/>
            <button onClick={save}>Save</button>
        </div>
    )
}

export default CreateRecipe;