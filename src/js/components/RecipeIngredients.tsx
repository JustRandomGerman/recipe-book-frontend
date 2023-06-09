import style from '../../css/components/RecipeIngredients.module.css';
import IngredientItem from './IngredientItem';
import { Ingredient } from '../interfaces/Ingredient'
import Recipe from '../pages/Recipe';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

interface RecipeIngredientsProps{
    editing: boolean
    ingredients: Ingredient[]
    setRecipe: Function
}

function RecipeIngredients( {editing, ingredients, setRecipe}: RecipeIngredientsProps){
    const theme = useContext(ThemeContext);

    function handleAddIngredient(){
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
            {editing && <button title="Add a new ingredient" onClick={handleAddIngredient}>
                <img src={theme.plusImage} alt="Delete"></img>
            </button>}
        </section>
    )
}

export default RecipeIngredients;