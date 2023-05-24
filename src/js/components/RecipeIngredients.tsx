import style from '../../css/components/RecipeIngredients.module.css';
import IngredientItem from './IngredientItem';
import { Ingredient } from '../interfaces/Ingredient'
import Recipe from '../pages/Recipe';
import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import plus from '../../assets/plus-lg.svg';
import plus_white from '../../assets/plus-lg_white.svg';

interface RecipeIngredientsProps{
    editing: boolean
    ingredients: Ingredient[]
    setRecipe: Function
}

function RecipeIngredients( {editing, ingredients, setRecipe} : RecipeIngredientsProps){
    const theme = useContext(ThemeContext);

    function addIngredient(){
        setRecipe((oldRecipe: Recipe) => {
            const updatedIngredients = [...oldRecipe.ingredients, { amount: "", ingredient_name: "" }];
            return { ...oldRecipe, ingredients: updatedIngredients };
        });
    }

    return(
        <section className={style.ingredient_list}>
            <h2>Ingredients</h2>
            <table>
                <tbody>
                    {ingredients.map((ingredient, index) => <IngredientItem key={`${index}_${ingredient}`} index={index} editing={editing} ingredient={ingredient} setRecipe={setRecipe}/>)}
                </tbody>
            </table>
            {editing ? <button title="Add a new ingredient" onClick={addIngredient}>
                <img src={theme === "light" ? plus : plus_white} alt="Delete"></img>
            </button> : <></>}
        </section>
    )
}

export default RecipeIngredients;