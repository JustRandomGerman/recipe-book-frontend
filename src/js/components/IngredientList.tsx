import style from '../../css/components/IngredientList.module.css';
import IngredientItem from './IngredientItem';
import { Ingredient } from '../interfaces/Ingredient'

interface IngredientListProps{
    editing: boolean
    ingredients: Ingredient[]
    setRecipe: Function
}

function IngredientList( {editing, ingredients, setRecipe} : IngredientListProps){

    function addIngredient(){
        //TODO
    }

    return(
        <section className={style.ingredient_list}>
            <h2>Ingredients</h2>
            <table>
                <tbody>
                    {ingredients.map((ingredient, index) => <IngredientItem key={ingredient.ingredient_name} index={index} editing={editing} ingredient={ingredient} setRecipe={setRecipe}/>)}
                </tbody>
            </table>
            {editing ? <button onClick={addIngredient}>+</button> : <></>}
        </section>
    )
}

export default IngredientList;