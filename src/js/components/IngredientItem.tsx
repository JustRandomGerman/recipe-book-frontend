import style from '../../css/components/IngredientItem.module.css';
import { useContext, useEffect, useRef } from 'react';
import { Ingredient } from '../interfaces/Ingredient'
import { Recipe } from '../interfaces/Recipe';
import { ThemeContext } from '../context/ThemeContext';

interface IngredientItemProps{
    index: number
    editing: boolean
    ingredient: Ingredient
    ingredient_group_index: number 
    setRecipe: Function
}

function IngredientItem({index, editing, ingredient, ingredient_group_index, setRecipe}: IngredientItemProps){
    const theme = useContext(ThemeContext)

    const amountInputRef = useRef<HTMLInputElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);

    //adjust width of the input elements to mimick behavior of p elements
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
        setRecipe((oldRecipe: Recipe) => {
            const updatedIngredient = { ...ingredient, [name]: value };
            const updatedIngredients = [...oldRecipe.ingredient_groups[ingredient_group_index].ingredients];
            //using the index to update, because name might not be unique
            updatedIngredients[index] = updatedIngredient;

            const updatedIngredientGroup = {
                ...oldRecipe.ingredient_groups[ingredient_group_index],
                ingredients: updatedIngredients
            };
            
            const updatedIngredientGroups = [...oldRecipe.ingredient_groups];
            updatedIngredientGroups[ingredient_group_index] = updatedIngredientGroup;
            
            return {
                ...oldRecipe,
                ingredient_groups: updatedIngredientGroups
            };
        })
    }

    function handleRemoveIngredient() {
        setRecipe((oldRecipe: Recipe) => {
            const updatedIngredients = [...oldRecipe.ingredient_groups[ingredient_group_index].ingredients];
            // Using the index to splice, because name might not be unique
            updatedIngredients.splice(index, 1);
        
            const updatedIngredientGroup = {
                ...oldRecipe.ingredient_groups[ingredient_group_index],
                ingredients: updatedIngredients
            };
        
            const updatedIngredientGroups = [...oldRecipe.ingredient_groups];
            updatedIngredientGroups[ingredient_group_index] = updatedIngredientGroup;
        
            return {
                ...oldRecipe,
                ingredient_groups: updatedIngredientGroups
            };
        });
    }
      

    return(
        <tr className={style.ingredient}>
            <td>
                <input type="text" name="amount" placeholder={editing ? "amount" : "" /* only show the placeholder when editing as the amount is allowed to be empty */} value={ingredient.amount} onInput={handleInput} disabled={!editing} ref={amountInputRef}/>
            </td>
            <td>
                <input type="text" name="ingredient_name" placeholder="name" value={ingredient.ingredient_name} onInput={handleInput} disabled={!editing} ref={nameInputRef}/>
            </td>
            <td>
                {editing && <button title="Delete ingredient" onClick={handleRemoveIngredient}><img src={theme.deleteImage} alt="Delete"/> </button>}
            </td>
        </tr>
    )
}

export default IngredientItem;