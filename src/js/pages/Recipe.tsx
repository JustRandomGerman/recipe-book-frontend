import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import style from '../../css/pages/Recipe.module.css';
import CollectionMenu from '../components/CollectionMenu';
import DeleteMenu from '../components/DeleteMenu';
import RecipeImage from '../components/RecipeImage';
import RecipeHeading from '../components/RecipeHeading';
import RecipeKeywords from '../components/RecipeKeywords';
import RecipeInstructions from '../components/RecipeInstructions';
import TagList from '../components/RecipeTags';
import { Recipe } from '../interfaces/Recipe';
import { deleteRecipe, getRecipe, updateRecipe } from '../../api';
import { ThemeContext } from '../context/ThemeContext';
import { Ingredient } from '../interfaces/Ingredient';
import { IngredientGroup } from '../interfaces/IngredientGroup';

function Recipe(){
    const theme = useContext(ThemeContext);
    
    const [collectionPopupShown, setCollectionPopupShown] = useState<boolean>(false);
    const [deleteMenuShown, setDeleteMenuShown] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [loadingError, setLoadingError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [recipe, setRecipe] = useState<Recipe>();
    const [orginalRecipe, setOriginalRecipe] = useState<Recipe>();
    
    const params = useParams();
    const id: number = Number(params.id);

    useEffect( () => {
        /*getRecipe(id).then((response) => {
            setRecipe(response);
            setOriginalRecipe(response);
            setLoading(false);
        }).catch((error) => {
            setLoadingError(error)
            setLoading(false)
        })*/
        setRecipe({
            "id": 4,
            "name": "Bruschetta",
            "instructions": "Die Tomaten in kleine Stücke schneiden und mit dem Saft in eine Schüssel geben. Den Knoblauch sehr klein hacken bzw. die sehr klein würfeln und dazugeben. Den Basilikum hineinhacken und mit dem Olivenöl dazugeben. Zum Schluss noch mit Salz und Pfeffer abschmecken und optional eine halbe Stunde ziehen lassen.",
            "last_viewed": new Date("2023-12-16T16:24:37.000Z"),
            "image_paths": [
                {
                    "path": "http://localhost:3000/images/4-Bruschetta-0.jpg"
                }
            ],
            "ingredient_groups": [
                {
                    "name": "_main_",
                    "position": 1,
                    "ingredients": [
                        {
                            "id": 38,
                            "amount": "3",
                            "ingredient_name": "Tomaten",
                            "position": 1
                        },
                        {
                            "id": 39,
                            "amount": "4 EL",
                            "ingredient_name": "Olivenöl",
                            "position": 2
                        },
                        {
                            "id": 40,
                            "amount": "1",
                            "ingredient_name": "Knoblauchzehe",
                            "position": 3
                        },
                        {
                            "id": 41,
                            "amount": "",
                            "ingredient_name": "frischer Basilikum",
                            "position": 4
                        },
                        {
                            "id": 42,
                            "amount": "",
                            "ingredient_name": "Salz",
                            "position": 5
                        },
                        {
                            "id": 43,
                            "amount": "",
                            "ingredient_name": "Pfeffer",
                            "position": 6
                        }
                    ]
                }
            ],
            "tags": [
                {
                    "id": 8,
                    "tag_name": "dinner"
                },
                {
                    "id": 9,
                    "tag_name": "allyear"
                }
            ],
            "keywords": [],
            "collections": []
        })
    }, [])

    function handleShowCollectionPopup(){
        setCollectionPopupShown(true);
    }

    function handleEdit(){
        setEditing(true);
    }

    function handleSave(){
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

    function handleCancel(){
        setEditing(false);
        setRecipe(orginalRecipe);
    }

    
    function handleDelete(){
        setDeleteMenuShown(true);
    }

    const navigate = useNavigate()
    //the function passed to the DeleteMenu
    function deleteFunction(){
        deleteRecipe(id).then((response) => {
            navigate("/");
        })
    }

    function handleSavePdf() {
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
            recipe!.ingredient_groups.forEach((ingredient_group: IngredientGroup) => {
                ingredient_group.ingredients.forEach((ingredient: Ingredient) => {
                    doc.text(`- ${ingredient.amount} ${ingredient.ingredient_name}`, 10, y);
                    y += 7;
                });
            })

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
                    <DeleteMenu shown={deleteMenuShown} setShown={setDeleteMenuShown} deletedObject='recipe' deleteFunction={deleteFunction}/>
                    <RecipeImage editing={editing} image_paths={recipe!.image_paths} setRecipe={setRecipe}/>
                    <section>
                        <p className='error'>{error}</p>
                        <p className='success'>{success}</p>
                    </section>
                    <section className={style.control_buttons}>
                        {editing && <button title="Save the recipe" onClick={handleSave}>
                            <img src={theme.checkImage} alt="Save"/>
                        </button>}
                        {editing && <button title="Cancel editing" onClick={handleCancel}>
                            <img src={theme.xImage} alt="Cancel" />
                        </button>}
                        {!editing && <button title="Edit recipe" onClick={handleEdit}>
                            <img src={theme.editImage} alt="Edit"/>
                        </button>}
                        {!editing && <button title="Show collection popup" onClick={handleShowCollectionPopup}>
                            <img src={theme.collectionImage} alt="Add to collection"/>
                        </button>}
                        {!editing && <button title="Delete recipe" onClick={handleDelete}>
                            <img src={theme.deleteImage} alt="Delete"/>
                        </button>}
                        {!editing && <button title="Download PDF of the recipe" onClick={handleSavePdf}>
                            <img src={theme.downloadImage} alt="Download"/>
                        </button>}
                    </section>
                    <RecipeHeading editing={editing} name={recipe!.name} setRecipe={setRecipe} />
                    {editing && <RecipeKeywords editing={editing} keywords={recipe!.keywords} setRecipe={setRecipe} /> }
                    <RecipeIngredientGroups editing={editing} ingredients={recipe!.ingredient_groups} setRecipe={setRecipe} />
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