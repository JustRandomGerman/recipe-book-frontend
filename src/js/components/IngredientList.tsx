import style from '../../css/components/IngredientList.module.css';
import IngredientItem from './IngredientItem';
//import Ingredient from './IngredientItem'

interface Ingredient{
    amount: string,
    name: string
}

interface IngredientListProps{
    editing: boolean
    ingredients: Ingredient[]
    //TODO ?????
}

function IngredientList( {editing, ingredients} : IngredientListProps){

    return(
        <section className={style.ingredient_list}>
            <h2>Ingredients</h2>
            <table>
                {ingredients.map(ingredient => <IngredientItem editing={editing} ingredient={ingredient}/>)}
            </table>
        </section>
    )
}

export default IngredientList;