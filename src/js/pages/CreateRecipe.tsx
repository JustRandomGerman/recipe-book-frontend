import style from '../../css/pages/CreateRecipe.module.css';
import RecipeImage from '../components/RecipeImage';
import RecipeHeading from '../components/RecipeHeading';
import RecipeIngredients from '../components/RecipeIngredients';
import RecipeInstructions from '../components/RecipeInstructions';
import RecipeTags from '../components/RecipeTags';
import { useState } from 'react';
import Recipe from './Recipe';
import RecipeKeywords from '../components/RecipeKeywords';
import { createRecipe } from '../../api';
import { useNavigate } from 'react-router-dom';

function CreateRecipe(){
    const emptyRecipe : Recipe = {
        id: 0,
        name: 'Recipe Name',
        keywords: [],
        image_paths: [{path: ''}],
        ingredients: [],
        instructions: 'Recipe Instructions',
        tags: [],
        collections: []
      };
    let [recipe, setRecipe] = useState<Recipe>(emptyRecipe);
    let [error, setError] = useState<string>();

    const navigate = useNavigate();
    function save(){
        createRecipe(recipe).then((response) => {
            navigate(`/recipe/${response.id}`)
        }).catch((error) => {
            setError(error);
        });
    }
    
    return(
        <div className={style.create_recipe}>
            <RecipeImage editing={true} image_paths={recipe.image_paths} setRecipe={setRecipe}/>
            <section>
                <p className='error'>{error}</p>
            </section>
            <RecipeHeading editing={true} name={recipe.name} setRecipe={setRecipe} />
            <RecipeKeywords editing={true} keywords={recipe.keywords} setRecipe={setRecipe} />
            <RecipeIngredients editing={true} ingredients={recipe.ingredients} setRecipe={setRecipe} />
            <RecipeInstructions editing={true} instructions={recipe.instructions} setRecipe={setRecipe} />
            <RecipeTags editing={true} tags={recipe.tags} setRecipe={setRecipe}/>
            <button id={style.save_button} title="Save the new recipe" onClick={save}>Save</button>
        </div>
    )
}

export default CreateRecipe;