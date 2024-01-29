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
    //console.log("rerendering")
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
    
    function handleMoveUp(){
        setRecipe((prevRecipe: Recipe) => {
            if (ingredient_group_index > 0 && ingredient_group_index < prevRecipe.ingredient_groups.length) {
                const updatedGroups = [...prevRecipe.ingredient_groups];
                const movedGroup = updatedGroups[ingredient_group_index];
                const previousGroup = updatedGroups[ingredient_group_index - 1];

                if(ingredient_group_index === movedGroup.position){
                    // Swap positions
                    const movedGroupPosition = movedGroup.position;
                    movedGroup.position = previousGroup.position;
                    previousGroup.position = movedGroupPosition;
                }

                // Sort the array based on the position attribute
                updatedGroups.sort((a, b) => a.position - b.position);

                return {
                    ...prevRecipe,
                    ingredient_groups: updatedGroups
                    };
            }
            return prevRecipe; // Return previous state if group cannot be moved
        });
    }

    function handleMoveDown(){
        setRecipe((prevRecipe: Recipe) => {
            if (ingredient_group_index >= 0 && ingredient_group_index < prevRecipe.ingredient_groups.length-1) {
                const updatedGroups = [...prevRecipe.ingredient_groups];
                const movedGroup = updatedGroups[ingredient_group_index];
                const previousGroup = updatedGroups[ingredient_group_index + 1];

                if(ingredient_group_index === movedGroup.position){
                    // Swap positions
                    const movedGroupPosition = movedGroup.position;
                    movedGroup.position = previousGroup.position;
                    previousGroup.position = movedGroupPosition;
                }

                // Sort the array based on the position attribute
                updatedGroups.sort((a, b) => a.position - b.position);

                return {
                    ...prevRecipe,
                    ingredient_groups: updatedGroups
                    };
            }
            return prevRecipe; // Return previous state if group cannot be moved
        });
    }

    function handleDelete(){
        console.log("Deleted... just kidding")
        //TODO implement
        // first confirm deletion
        // afterwards correct position of following elements
    }

    return(
        <section className={style.ingredient_list}>
            <div className={style.title_bar}>
                {editing && <button title="Move group up" onClick={handleMoveUp}>
                    <img src={theme.arrowUpImage} alt="Up"></img>
                </button>}
                {editing && <button title="Move group down" onClick={handleMoveDown}>
                    <img src={theme.arrowDownImage} alt="Down"></img>
                </button>}
                {(name !== "_main_") ? <input type="text" value={name} placeholder="Ingredient group" onInput={handleInput} disabled={!editing} /> : <input type="text" value="" placeholder="Main group" disabled={true} />}
                {editing && <button title="Add a new ingredient" onClick={handleAddIngredient}>
                    <img src={theme.plusImage} alt="Add"></img>
                </button>}
                {editing && <button title="Delete group" onClick={handleDelete}>
                    <img src={theme.deleteImage} alt="Delete"></img>
                </button>}
            </div>
            <table>
                <tbody>
                    {ingredients.map((ingredient, index) => <IngredientItem key={`${index}_${ingredient}`} index={index} editing={editing} ingredient={ingredient} ingredient_group_index={ingredient_group_index} setRecipe={setRecipe}/>)}
                </tbody>
            </table>
        </section>
    )
}

export default IngredientGroupItem;