import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from '../../css/pages/Recipe.module.css';
import CollectionMenu from '../components/CollectionMenu';
import RecipeImage from '../components/RecipeImage';
import RecipeHeading from '../components/RecipeHeading';
import IngredientList from '../components/IngredientList';
import RecipeInstructions from '../components/RecipeInstructions';
import TagList from '../components/TagList';
import edit_image from '../../assets/pencil.svg'
import edit_image_white from '../../assets/pencil_white.svg'
import check_image from '../../assets/check2.svg'
import check_image_white from '../../assets/check2_white.svg'
import cancel_image from '../../assets/x.svg'
import cancel_image_white from '../../assets/x_white.svg'
import collection_image from '../../assets/collection.svg'
import collection_image_white from '../../assets/collection_white.svg'
import delete_image from '../../assets/trash.svg'
import delete_image_white from '../../assets/trash_white.svg'
import download_image from '../../assets/download.svg'
import download_image_white from '../../assets/download_white.svg'
import { Recipe } from '../interfaces/Recipe';

import axios from 'axios'
import ThemeContext from '../context/ThemeContext';

function Recipe(){
    const theme = useContext(ThemeContext);
    
    let [collectionPopupShown, setCollectionPopupShown] = useState<boolean>(false);
    let [editing, setEditing] = useState<boolean>(false);
    let [loading, setLoading] = useState<boolean>(true);
    let [recipe, setRecipe] = useState<Recipe>();
    let [orginalRecipe, setOriginalRecipe] = useState<Recipe>();
    
    const params = useParams();
    useEffect( () => {
        axios.get<Recipe>("http://localhost:3000/recipes/" + params.id).then((response) => {
          setRecipe(response.data);
          setOriginalRecipe(response.data);
          setLoading(false);
        })
    }, [])

    function showCollectionPopup(){
        setCollectionPopupShown(true);
    }

    function edit(){
        setEditing(true);
    }

    function save(){
        setEditing(false);
        axios.put<Recipe>("http://localhost:3000/recipes/" + params.id, {
            name: recipe?.name,
            instructions: recipe?.instructions,
            ingredients: recipe?.ingredients,
            tags: recipe?.tags,
            image: recipe?.image
        }).then((response) => {
            console.log(response)
        })

        setOriginalRecipe(recipe);
    }

    function cancel(){
        setEditing(false);
        console.log(recipe)
        setRecipe(orginalRecipe);
    }

    function deleteRecipe(){
        //TODO send DELETE request to server
    }

    function savePdf(){
        //TODO
    } 

    return(
        <div className={style.recipe}>
            {!loading ? (
                <>
                    <CollectionMenu shown={collectionPopupShown} setShown={setCollectionPopupShown}/>
                    <RecipeImage editing={editing} image={recipe!.image} setRecipe={setRecipe}/>
                    <section className={style.control_buttons}>
                        {editing ? <button onClick={save}>
                            <img src={theme === "light" ? check_image : check_image_white} alt={"Save"}/>
                        </button> : <></>}
                        {editing ? <button onClick={cancel}>
                            <img src={theme === "light" ? cancel_image : cancel_image_white} alt='cancel' />
                        </button> : <></>}
                        {!editing ? <button onClick={edit}>
                            <img src={theme === "light" ? edit_image : edit_image_white} alt={"Edit"}/>
                        </button> : <></>}
                        {!editing ? <button onClick={showCollectionPopup}>
                            <img src={theme === "light" ? collection_image : collection_image_white} alt='Add to collection'/>
                        </button> : <></>}
                        {!editing ? <button onClick={deleteRecipe}>
                            <img src={theme === "light" ? delete_image : delete_image_white} alt='Delete'/>
                        </button> : <></>}
                        {!editing ? <button onClick={savePdf}>
                            <img src={theme === "light" ? download_image : download_image_white} alt='Download'/>
                        </button> : <></>}
                    </section>
                    <RecipeHeading editing={editing} name={recipe!.name} setRecipe={setRecipe} />
                    <IngredientList editing={editing} ingredients={recipe!.ingredients} setRecipe={setRecipe} />
                    <RecipeInstructions editing={editing} instructions={recipe!.instructions} setRecipe={setRecipe} />
                    <TagList editing={editing} tags={recipe!.tags} setRecipe={setRecipe}/>
                </>
            ) : <p>loading...</p>}
        </div>
        
    )
}

export default Recipe;