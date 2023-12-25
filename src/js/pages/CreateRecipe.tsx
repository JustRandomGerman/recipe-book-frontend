import style from '../../css/pages/CreateRecipe.module.css';
import RecipeImage from '../components/RecipeImage';
import RecipeHeading from '../components/RecipeHeading';
import RecipeIngredientGroups from '../components/RecipeIngredientGroups';
import RecipeInstructions from '../components/RecipeInstructions';
import RecipeTags from '../components/RecipeTags';
import { useContext, useState } from 'react';
import Recipe from './Recipe';
import RecipeKeywords from '../components/RecipeKeywords';
import { createRecipe } from '../../api';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

function CreateRecipe(){
    const theme = useContext(ThemeContext);
    const emptyRecipe: Recipe = {
        id: 0,
        name: "",
        keywords: [],
        image_paths: [{ path: '' }],
        ingredient_groups: [{name: '_main_', position: 0, ingredients: []}],
        instructions: "",
        tags: [],
        collections: [],
        last_viewed: new Date(Date.now())
    };
    const [recipe, setRecipe] = useState<Recipe>(emptyRecipe);
    const [error, setError] = useState<string>();

    const navigate = useNavigate();
    function handleSave(){
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
            <section className={style.control_buttons}>
                <button id={style.save_button} title="Save the new recipe" onClick={handleSave}>
                    <img src={theme.saveImage} alt="Save"/>
                </button>
            </section>
            <RecipeHeading editing={true} name={recipe.name} setRecipe={setRecipe} />
            <RecipeKeywords editing={true} keywords={recipe.keywords} setRecipe={setRecipe} />
            <RecipeIngredientGroups editing={true} ingredient_groups={recipe.ingredient_groups} setRecipe={setRecipe} />
            <RecipeInstructions editing={true} instructions={recipe.instructions} setRecipe={setRecipe} />
            <RecipeTags editing={true} tags={recipe.tags} setRecipe={setRecipe}/>
        </div>
    )
}

export default CreateRecipe;