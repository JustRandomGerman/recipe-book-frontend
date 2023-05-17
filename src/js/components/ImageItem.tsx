import { ChangeEvent, useContext } from 'react';
import { Recipe } from '../interfaces/Recipe';
import { ImagePath } from '../interfaces/ImagePath';
import axios from 'axios';

interface ImageItemProps{
    index: number
    currentIndex: number
    image_path: ImagePath
    setRecipe: Function
}

function ImageItem ({ index, currentIndex, image_path, setRecipe } : ImageItemProps){

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
            {index === currentIndex ?
                <>
                    {image_path.path !== "" ? 
                        <img key={image_path.path} src={image_path.path} alt="image of food"></img>
                    :
                        <input name="new_image" type='file' accept='image/*' onChange={uploadImage}></input>
                    }
                </>
            :
                <></>
            }
        </>
    )
}

export default ImageItem;