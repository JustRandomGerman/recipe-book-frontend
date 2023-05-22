import { ChangeEvent, useContext } from 'react';
import { Recipe } from '../interfaces/Recipe';
import { ImagePath } from '../interfaces/ImagePath';
import { uploadImage } from '../../api';

interface ImageItemProps{
    index: number
    currentIndex: number
    image_path: ImagePath
    setRecipe: Function
}

function ImageItem ({ index, currentIndex, image_path, setRecipe } : ImageItemProps){

    function handleUploadImage(event : ChangeEvent<HTMLInputElement>){
        const { files } = event.currentTarget;
        console.log(files)
        uploadImage(files).then((response) => {
            console.log(response);
            setRecipe((oldRecipe : Recipe) => {
                const updatedImagePaths = [...oldRecipe.image_paths];
                updatedImagePaths[index] = {path: response.image};
                return { ...oldRecipe, image_paths: updatedImagePaths};
            })
        });
    }

    return(
        <>
            {index === currentIndex ?
                <>
                    {image_path.path !== "" ? 
                        <img src={image_path.path} alt="image of food"></img>
                    :
                        <input name="new_image" type='file' accept='image/*' onChange={handleUploadImage}></input>
                    }
                </>
            :
                <></>
            }
        </>
    )
}

export default ImageItem;