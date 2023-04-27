import style from '../../css/components/IngredientItem.module.css';
import { Ingredient } from '../interfaces/Ingredient'

interface IngredientItemProps{
    editing: boolean
    ingredient: Ingredient
}

function IngredientItem({editing, ingredient} : IngredientItemProps){

    return(
        <tr className={style.ingredient}>
            <td contentEditable={editing}>{ingredient.amount}</td>
            <td contentEditable={editing}>{ingredient.name}</td>
        </tr>
    )
}

export default IngredientItem;