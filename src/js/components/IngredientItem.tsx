import style from '../../css/components/IngredientItem.module.css';
import { Ingredient } from '../interfaces/Ingredient'
import delete_image from '../../assets/trash.svg'

interface IngredientItemProps{
    editing: boolean
    ingredient: Ingredient
}

function IngredientItem({editing, ingredient} : IngredientItemProps){

    function removeIngredient(){
        //TODO
    }

    return(
        <tr className={style.ingredient}>
            <td contentEditable={editing}>{ingredient.amount}</td>
            <td contentEditable={editing}>{ingredient.name}</td>
            {editing ? <button onClick={removeIngredient}><img src={delete_image} /> </button> : <></>}
        </tr>
    )
}

export default IngredientItem;