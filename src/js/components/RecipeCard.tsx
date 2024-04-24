import style from '../../css/components/RecipeCard.module.css';
import { Link } from 'react-router-dom';
import { Recipe } from '../interfaces/Recipe';

interface RecipeCardProps{
    recipe: Recipe
    setSidebarShown: Function
}

function RecipeCard( { recipe, setSidebarShown }: RecipeCardProps){
    
    function hideSidebar(){
        setSidebarShown(false);
    }

    return(
        <div className={style.recipe_card}>
            <Link to={"/recipe/" + recipe.id} onClick={hideSidebar}>
                <div>
                    <img src={recipe.image_paths[0].path} alt='image'></img>
                    <h1>{recipe.name}</h1>
                </div>
            </Link>
        </div>
    )
}

export default RecipeCard;