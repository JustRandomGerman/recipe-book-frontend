import { useContext, useState } from 'react';
import { ImagePath } from '../interfaces/ImagePath';
import ThemeContext from '../context/ThemeContext';
import ImageItem from './ImageItem';
import { Recipe } from '../interfaces/Recipe';
import delete_image from '../../assets/trash.svg'
import delete_image_white from '../../assets/trash_white.svg'
import style from '../../css/components/RecipeImage.module.css';

interface RecipeImageProps{
    editing: boolean,
    image_paths: ImagePath[],
    setRecipe: Function
}

function RecipeImage ({ editing, image_paths, setRecipe } : RecipeImageProps){
    const theme = useContext(ThemeContext);

    let [ currentIndex, setCurrentIndex] = useState<number>(0);

    function moveLeft(){
        if(currentIndex > 0){
            setCurrentIndex((oldIndex) => oldIndex - 1);
        }
    }

    function moveRight(){
        if(currentIndex < (image_paths.length - 1)){
            setCurrentIndex((oldIndex) => oldIndex + 1);
        }
    }

    function deleteImage(){
        setRecipe((oldRecipe : Recipe) => {
            const updatedImagePaths = [...oldRecipe.image_paths];
            updatedImagePaths.splice(currentIndex, 1);
            return {...oldRecipe, image_paths: updatedImagePaths};
        })
    }

    function addImage(){
        setRecipe((oldRecipe : Recipe) => {
            const updatedImagePaths = [...oldRecipe.image_paths, { path: "" }];
            return { ...oldRecipe, image_paths: updatedImagePaths };
        })        
    }

    return(
        <>
            {image_paths.map( (image_path : ImagePath, index : number) => {
                return <ImageItem key={image_path.path} index={index} currentIndex={currentIndex} image_path={image_path} setRecipe={setRecipe} />
            })}
            <div className={style.image_buttons}>
                <button onClick={moveLeft}>
                    {"<"}
                </button>
                <button onClick={moveRight}>
                    {">"}
                </button>
                {editing && image_paths[currentIndex].path !== "" ? <>
                    <button onClick={deleteImage}>
                        <img src={theme === "light" ? delete_image : delete_image_white} alt="Delete"></img>
                    </button>
                    <button onClick={addImage}>
                        +
                    </button>
                </> : <></>}
            </div>
        </>
    )
}

export default RecipeImage;