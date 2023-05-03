import style from '../../css/components/RecipeCard.module.css';
import { Link } from 'react-router-dom';
import image from '../../assets/marmorkuchen.jpg';
import { Recipe } from '../interfaces/Recipe';

interface RecipeCardProps{
    recipe: Recipe
}

function RecipeCard( { recipe } : RecipeCardProps){
    

    return(
        <div className={style.recipe_card}>
            <Link to={"/recipe/" + recipe.id}>
                <div>
                    <img src={image} alt='image'></img>
                    <h1>{recipe.name}</h1>
                </div>
            </Link>
        </div>
    )
}

export default RecipeCard;