import style from '../../css/components/IngredientItem.module.css';

interface Ingredient{
    amount: string,
    name: string
}

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