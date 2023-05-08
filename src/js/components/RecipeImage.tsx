import { ChangeEvent } from 'react';
import style from '../../css/components/RecipeImage.module.css';
import { Recipe } from '../interfaces/Recipe';
import axios from 'axios'

interface RecipeImageProps{
    editing: boolean,
    image: string,
    setRecipe: Function
}

function RecipeImage ({ editing, image, setRecipe } : RecipeImageProps){

    function deleteImage(){
        setRecipe((oldRecipe : Recipe) => ({
            ...oldRecipe,
            image: null
        }))
    }

    function uploadImage(event : ChangeEvent<HTMLInputElement>){
        console.log(event.currentTarget)
        const { files } = event.currentTarget;
        const formData = new FormData;
        formData.append("image", files![0])
        axios.post("http://localhost:3000/recipes/upload", formData).then((response) => {
            setRecipe((oldRecipe : Recipe) => ({
                ...oldRecipe,
                image: response.data.image
            }))
        })
    }

    return(
        <>
            {image !== null ? 
                <img src={image} alt="image of food"></img>
            :
                <input name="new_image" type='file' accept='image/*' onChange={uploadImage}></input>
            }
            {editing && image !== null ? <div className={style.image_buttons}>
                <button onClick={deleteImage}>Delete</button>
            </div> : <></>}
        </>
    )
}

export default RecipeImage;