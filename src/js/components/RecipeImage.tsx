import { ChangeEvent, useContext } from 'react';
import style from '../../css/components/RecipeImage.module.css';
import { Recipe } from '../interfaces/Recipe';
import axios from 'axios'
import delete_image from '../../assets/trash.svg'
import delete_image_white from '../../assets/trash_white.svg'
import ThemeContext from '../context/ThemeContext';

interface RecipeImageProps{
    editing: boolean,
    image: string,
    setRecipe: Function
}

function RecipeImage ({ editing, image, setRecipe } : RecipeImageProps){
    const theme = useContext(ThemeContext);

    function deleteImage(){
        setRecipe((oldRecipe : Recipe) => ({
            ...oldRecipe,
            image: ""
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
            {image !== "" ? 
                <img src={image} alt="image of food"></img>
            :
                <input name="new_image" type='file' accept='image/*' onChange={uploadImage}></input>
            }
            {editing && image !== null ? <div className={style.image_buttons}>
                <button onClick={deleteImage}>
                    <img src={theme === "light" ? delete_image : delete_image_white} alt="Delete"></img>
                </button>
            </div> : <></>}
        </>
    )
}

export default RecipeImage;