import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import style from '../../css/pages/Recipe.module.css';
import CollectionMenu from '../components/CollectionMenu';
import RecipeImage from '../components/RecipeImage';
import RecipeHeading from '../components/RecipeHeading';
import RecipeKeywords from '../components/RecipeKeywords';
import RecipeIngredients from '../components/RecipeIngredients';
import RecipeInstructions from '../components/RecipeInstructions';
import TagList from '../components/RecipeTags';
import edit_image from '../../assets/pencil.svg';
import edit_image_white from '../../assets/pencil_white.svg';
import check_image from '../../assets/check2.svg';
import check_image_white from '../../assets/check2_white.svg';
import cancel_image from '../../assets/x.svg';
import cancel_image_white from '../../assets/x_white.svg';
import collection_image from '../../assets/collection.svg';
import collection_image_white from '../../assets/collection_white.svg';
import delete_image from '../../assets/trash.svg';
import delete_image_white from '../../assets/trash_white.svg';
import download_image from '../../assets/download.svg';
import download_image_white from '../../assets/download_white.svg';
import { Recipe } from '../interfaces/Recipe';
import { getRecipe, updateRecipe, deleteRecipe } from '../../api';
import ThemeContext from '../context/ThemeContext';
import { Ingredient } from '../interfaces/Ingredient';

function Recipe(){
    const theme = useContext(ThemeContext);
    
    let [collectionPopupShown, setCollectionPopupShown] = useState<boolean>(false);
    let [editing, setEditing] = useState<boolean>(false);
    let [loading, setLoading] = useState<boolean>(true);
    let [error, setError] = useState<string>("");
    let [loadingError, setLoadingError] = useState<string>("");
    let [success, setSuccess] = useState<string>("");
    let [recipe, setRecipe] = useState<Recipe>();
    let [orginalRecipe, setOriginalRecipe] = useState<Recipe>();
    
    const params = useParams();
    const id : number = Number(params.id);

    useEffect( () => {
        getRecipe(id).then((response) => {
            setRecipe(response);
            setOriginalRecipe(response);
            setLoading(false);
        }).catch((error) => {
            setLoadingError(error)
            setLoading(false)
        })
    }, [])

    function showCollectionPopup(){
        setCollectionPopupShown(true);
    }

    function edit(){
        setEditing(true);
    }

    function save(){
        updateRecipe(id, recipe!).then((response) => {
            setEditing(false);
            setSuccess("Successfully saved recipe");
            //set original recipe to the new one after saving
            setOriginalRecipe(recipe);
            //hide success message after some time
            setTimeout(() => {
                setSuccess("");
            }, 5000)
        }).catch((error) => {
            setError(error);
            setTimeout(() => {
                setError("");
            }, 5000)
        });
    }

    function cancel(){
        setEditing(false);
        setRecipe(orginalRecipe);
    }

    const navigate = useNavigate();
    function deleteRecipeButton(){
        deleteRecipe(id).then((response) => {
            navigate("/");
        })
    }

    function savePdf() {
        import('jspdf').then((pdf) => {
            const doc = new pdf.jsPDF();
            
            // Add recipe details to the PDF
            doc.setFont("Helvetica", "bold")
            doc.text(recipe!.name, 10, 20);

            doc.setFontSize(12);
            doc.text("Zutaten:", 10, 30);
            
            doc.setFont("Helvetica", "normal")
            // Loop through ingredients and add them to the PDF
            let y = 37;
            recipe!.ingredients.forEach((ingredient : Ingredient) => {
                doc.text(`- ${ingredient.amount} ${ingredient.ingredient_name}`, 10, y);
                y += 7;
            });

            //Add the instructions
            doc.setFont("Helvetica", "bold")
            doc.text("Anweisungen:", 10, y + 5)
            doc.setFont("Helvetica", "normal")
            doc.text(recipe!.instructions, 10, y + 15, {maxWidth: doc.internal.pageSize.getWidth() - 20});
            
            // Save the PDF file
            doc.save(`${recipe!.name}.pdf`);
        });
    }

    return(
        <div className={style.recipe}>
            {!loading && loadingError === "" ? (
                <>
                    <CollectionMenu shown={collectionPopupShown} setShown={setCollectionPopupShown} recipeId={id} recipeCollections={recipe!.collections} setRecipe={setRecipe}/>
                    <RecipeImage editing={editing} image_paths={recipe!.image_paths} setRecipe={setRecipe}/>
                    <section>
                        <p className='error'>{error}</p>
                        <p className='success'>{success}</p>
                    </section>
                    <section className={style.control_buttons}>
                        {editing && <button title="Save the recipe" onClick={save}>
                            <img src={theme === "light" ? check_image : check_image_white} alt={"Save"}/>
                        </button>}
                        {editing && <button title="Cancel editing" onClick={cancel}>
                            <img src={theme === "light" ? cancel_image : cancel_image_white} alt='cancel' />
                        </button>}
                        {!editing && <button title="Edit recipe" onClick={edit}>
                            <img src={theme === "light" ? edit_image : edit_image_white} alt={"Edit"}/>
                        </button>}
                        {!editing && <button title="Show collection popup" onClick={showCollectionPopup}>
                            <img src={theme === "light" ? collection_image : collection_image_white} alt='Add to collection'/>
                        </button>}
                        {!editing && <button title="Delete recipe" onClick={deleteRecipeButton}>
                            <img src={theme === "light" ? delete_image : delete_image_white} alt='Delete'/>
                        </button>}
                        {!editing && <button title="Download PDF of the recipe" onClick={savePdf}>
                            <img src={theme === "light" ? download_image : download_image_white} alt='Download'/>
                        </button>}
                    </section>
                    <RecipeHeading editing={editing} name={recipe!.name} setRecipe={setRecipe} />
                    {editing && <RecipeKeywords editing={editing} keywords={recipe!.keywords} setRecipe={setRecipe} /> }
                    <RecipeIngredients editing={editing} ingredients={recipe!.ingredients} setRecipe={setRecipe} />
                    <RecipeInstructions editing={editing} instructions={recipe!.instructions} setRecipe={setRecipe} />
                    <TagList editing={editing} tags={recipe!.tags} setRecipe={setRecipe}/>
                </>
            ) : (
                <>
                    {loading && <p className="loading">loading...</p>}
                    <p className="error">{loadingError}</p>
                </>
            )}
        </div>
        
    )
}

export default Recipe;