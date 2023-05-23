import style from '../../css/components/RecipeHeading.module.css';
import { Recipe } from '../interfaces/Recipe';

interface RecipeHeadingProps {
    editing: boolean,
    name: string,
    setRecipe: Function
}

function RecipeHeading({ editing, name, setRecipe } : RecipeHeadingProps) {

    function handleInput(event : React.FormEvent<HTMLInputElement>) {
        const value = event.currentTarget.value;
        setRecipe((oldRecipe : Recipe) => ({
            ...oldRecipe,
            name: value
        }));
    }

    return (
        <input className={style.recipe_heading} type="text" value={name} onInput={handleInput} disabled={!editing} />
    )
}

export default RecipeHeading;