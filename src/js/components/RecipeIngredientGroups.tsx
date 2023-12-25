import style from '../../css/components/RecipeIngredientGroups.module.css';
import { IngredientGroup } from '../interfaces/IngredientGroup'
import Recipe from '../pages/Recipe';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import IngredientGroupItem from './IngredientGroupItem';

interface RecipeIngredientGroupsProps{
    editing: boolean
    ingredient_groups: IngredientGroup[]
    setRecipe: Function
}

function RecipeIngredientGroups( {editing, ingredient_groups, setRecipe}: RecipeIngredientGroupsProps){
    const theme = useContext(ThemeContext);

    function handleAddIngredientGroup(){
        setRecipe((oldRecipe: Recipe) => {
            const updatedIngredientGroups = [...oldRecipe.ingredient_groups, { name: "", position: "", ingredients: [] }];
            return { ...oldRecipe, ingredient_groups: updatedIngredientGroups };
        });
        
    }

    return(
        <section className={style.ingredient_group_list}>
            <h2>Ingredients</h2>
            {ingredient_groups.map((ingredient_group: IngredientGroup, index: number) => <IngredientGroupItem editing={editing} ingredient_group_index={index} name={ingredient_group.name} ingredients={ingredient_group.ingredients} setRecipe={setRecipe}/>)/* TODO do correct postition based on position attribute */}
            {editing && <button title="Add a new ingredient group" onClick={handleAddIngredientGroup}>
                <img src={theme.plusImage} alt="Add"></img>
            </button>}
        </section>
    )
}

export default RecipeIngredientGroups;