import { useEffect, useRef } from 'react';
import style from '../../css/components/RecipeInstructions.module.css';
import { Recipe } from '../interfaces/Recipe';

interface RecipeInstructionProps{
    editing: boolean,
    recipe: Recipe,
    setRecipe: Function
}

function RecipeInstructions ({ editing, recipe, setRecipe } : RecipeInstructionProps){

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [recipe.instructions]);

    function handleInput(event: React.FormEvent<HTMLTextAreaElement>) {
        const value = event.currentTarget.value;
        setRecipe((oldRecipe: Recipe) => ({
            ...oldRecipe,
            instructions: value
        }));

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }

    return(
        <section>
            <h2>Instructions</h2>
            <textarea className={style.recipe_instructions} value={recipe.instructions} onInput={handleInput} disabled={!editing} ref={textareaRef}/>
        </section>
    )
}

export default RecipeInstructions;