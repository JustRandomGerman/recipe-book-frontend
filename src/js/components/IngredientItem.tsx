import style from '../../css/components/IngredientItem.module.css';
import { useContext, useEffect, useRef } from 'react';
import { Ingredient } from '../interfaces/Ingredient'
import delete_image from '../../assets/trash.svg'
import delete_image_white from '../../assets/trash_white.svg'
import { Recipe } from '../interfaces/Recipe';
import ThemeContext from '../context/ThemeContext';

interface IngredientItemProps{
    index: number
    editing: boolean
    ingredient: Ingredient
    setRecipe: Function
}

function IngredientItem({index, editing, ingredient, setRecipe} : IngredientItemProps){
    const theme = useContext(ThemeContext)

    const amountInputRef = useRef<HTMLInputElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (amountInputRef.current) {
            amountInputRef.current.style.width = (ingredient.amount.length + 1) + 'ch';
        }
        if (nameInputRef.current) {
            nameInputRef.current.style.width = (ingredient.ingredient_name.length + 1) + 'ch';
        }
    }, [ingredient.amount, ingredient.ingredient_name]);

    function handleInput(event: React.FormEvent<HTMLInputElement>) {
        const { name, value } = event.currentTarget;
        setRecipe((oldRecipe : Recipe) => {
            const updatedIngredient = { ...ingredient, [name]: value };
            const updatedIngredients = [...oldRecipe.ingredients];
            //using the index to update, because name might not be unique
            updatedIngredients[index] = updatedIngredient;
            return { ...oldRecipe, ingredients: updatedIngredients };
        })

        //ingredient_name input gets unfocussed. WHY?
    }

    function removeIngredient(){
        setRecipe((oldRecipe: Recipe) => {
          const updatedIngredients = [...oldRecipe.ingredients];
          //using the index to splice, because name might not be unique
          updatedIngredients.splice(index, 1);
          return { ...oldRecipe, ingredients: updatedIngredients };
        });
      }

    return(
        <tr className={style.ingredient}>
            <td>
                <input type="text" name="amount" value={ingredient.amount} onInput={handleInput} disabled={!editing} ref={amountInputRef}/>
            </td>
            <td>
                <input type="text" name="ingredient_name" value={ingredient.ingredient_name} onInput={handleInput} disabled={!editing} ref={nameInputRef}/>
            </td>
            <td>
                {editing ? <button onClick={removeIngredient}><img src={theme === "light" ? delete_image : delete_image_white} /> </button> : <></>}
            </td>
        </tr>
    )
}

export default IngredientItem;