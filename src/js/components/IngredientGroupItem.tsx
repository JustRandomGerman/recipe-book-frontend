import style from '../../css/components/IngredientGroupItem.module.css';
import IngredientItem from './IngredientItem';
import { Ingredient } from '../interfaces/Ingredient'
import Recipe from '../pages/Recipe';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

interface IngredientGroupItemProps{
    editing: boolean
    ingredient_group_index: number
    name: string
    ingredients: Ingredient[]
    setRecipe: Function
}

function IngredientGroupItem( {editing, ingredient_group_index, name, ingredients, setRecipe}: IngredientGroupItemProps){
    const theme = useContext(ThemeContext);

    function handleAddIngredient(){
        setRecipe((oldRecipe: Recipe) => {
            const updatedIngredients = [...oldRecipe.ingredient_groups[ingredient_group_index].ingredients, { amount: "", ingredient_name: "" }]; //TODO
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

    function handleInput(event: React.FormEvent<HTMLInputElement>) {
        const value = event.currentTarget.value;
        setRecipe((oldRecipe: Recipe) => {
            const updatedIngredientGroup = {
                ...oldRecipe.ingredient_groups[ingredient_group_index],
                name: value
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
        <section className={style.ingredient_list}>
            <input type="text" value={name} placeholder="Ingredient group" onInput={handleInput} disabled={!editing} />
            <table>
                <tbody>
                    {ingredients.map((ingredient, index) => <IngredientItem key={`${index}_${ingredient}`} index={index} editing={editing} ingredient={ingredient} ingredient_group_index={ingredient_group_index} setRecipe={setRecipe}/>)}
                </tbody>
            </table>
            {editing && <button title="Add a new ingredient" onClick={handleAddIngredient}>
                <img src={theme.plusImage} alt="Add"></img>
            </button>}
        </section>
    )
}

export default IngredientGroupItem;