import style from '../../css/components/IngredientList.module.css';
import IngredientItem from './IngredientItem';
import { Ingredient } from '../interfaces/Ingredient'



interface IngredientListProps{
    editing: boolean
    ingredients: Ingredient[]
}

function IngredientList( {editing, ingredients} : IngredientListProps){

    return(
        <section className={style.ingredient_list}>
            <h2>Ingredients</h2>
            <table>
                <tbody>
                    {ingredients.map(ingredient => <IngredientItem key={ingredient.name} editing={editing} ingredient={ingredient}/>)}
                </tbody>
            </table>
        </section>
    )
}

export default IngredientList;