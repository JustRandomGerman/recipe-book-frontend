import style from '../../css/components/RecipeCard.module.css';
import { Link } from 'react-router-dom';
import { Recipe } from '../interfaces/Recipe';

interface RecipeCardProps{
    recipe: Recipe
}

function RecipeCard( { recipe } : RecipeCardProps){
    

    return(
        <div className={style.recipe_card}>
            <Link to={"/recipe/" + recipe.id}>
                <div>
                    <img src={recipe.image_paths[0].path} alt='image'></img>
                    <h1>{recipe.name}</h1>
                </div>
            </Link>
        </div>
    )
}

export default RecipeCard;