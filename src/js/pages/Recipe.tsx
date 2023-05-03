import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from '../../css/pages/Recipe.module.css';
import CollectionMenu from '../components/CollectionMenu';
import RecipeImage from '../components/RecipeImage';
import RecipeHeading from '../components/RecipeHeading';
import IngredientList from '../components/IngredientList';
import RecipeInstructions from '../components/RecipeInstructions';
import TagList from '../components/TagList';
import edit_image from '../../assets/pencil.svg'
import check_image from '../../assets/check2.svg'
import collection_image from '../../assets/collection.svg'
import delete_image from '../../assets/trash.svg'
import download_image from '../../assets/download.svg'
import { Recipe } from '../interfaces/Recipe';

import axios from 'axios'

function Recipe(){
    let [collectionPopupShown, setCollectionPopupShown] = useState<boolean>(false);
    let [editing, setEditing] = useState<boolean>(false);
    let [loading, setLoading] = useState<boolean>(true);
    let [recipe, setRecipe] = useState<Recipe>();
    
    const params = useParams();
    useEffect( () => {
        axios.get<Recipe>("http://localhost:3000/recipes/" + params.id).then((response) => {
          setRecipe(response.data);
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
        console.log(recipe)
        //TODO send PUT request to server
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
                    <RecipeImage editing={editing} image={recipe!.image} />
                    <section className={style.control_buttons}>
                        <button onClick={editing ? save : edit}>
                            <img src={!editing ? edit_image : check_image} alt={!editing ? 'Edit' : 'Save'}/>
                        </button>
                        {!editing ? <button onClick={showCollectionPopup}>
                            <img src={collection_image} alt='Add to collection'/>
                        </button> : <></>}
                        {!editing ? <button onClick={deleteRecipe}>
                            <img src={delete_image} alt='Delete'/>
                        </button> : <></>}
                        {!editing ? <button onClick={savePdf}>
                            <img src={download_image} alt='Download'/>
                        </button> : <></>}
                    </section>
                    <RecipeHeading editing={editing} recipe={recipe!} setRecipe={setRecipe} />
                    <IngredientList editing={editing} ingredients={recipe!.ingredients} />
                    <RecipeInstructions editing={editing} recipe={recipe!} setRecipe={setRecipe} />
                    <TagList editing={editing} tags={recipe!.tags} />
                </>
            ) : <p>loading...</p>}
        </div>
        
    )
}

export default Recipe;