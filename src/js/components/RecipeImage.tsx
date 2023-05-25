import { useContext, useState } from 'react';
import { ImagePath } from '../interfaces/ImagePath';
import ThemeContext from '../context/ThemeContext';
import ImageItem from './ImageItem';
import { Recipe } from '../interfaces/Recipe';
import delete_image from '../../assets/trash.svg';
import delete_image_white from '../../assets/trash_white.svg';
import arrow_left from '../../assets/caret-left.svg';
import arrow_left_white from '../../assets/caret-left_white.svg';
import arrow_right from '../../assets/caret-right.svg';
import arrow_right_white from '../../assets/caret-right_white.svg';
import plus from '../../assets/plus-lg.svg';
import plus_white from '../../assets/plus-lg_white.svg';
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
        //TODO set current index to added image
    }

    return(
        <div className={style.images}>
            {image_paths.map( (image_path : ImagePath, index : number) => {
                return <ImageItem key={image_path.path} index={index} currentIndex={currentIndex} image_path={image_path} setRecipe={setRecipe} />
            })}
            <div className={style.image_buttons}>
                {editing && image_paths[currentIndex].path !== "" ? <>
                    <button title="Delete the current image" onClick={deleteImage}>
                        <img src={theme === "light" ? delete_image : delete_image_white} alt="Delete"></img>
                    </button>
                    <button title="Add a new image" onClick={addImage}>
                        <img src={theme === "light" ? plus : plus_white} alt="Delete"></img>
                    </button>
                </> : <></>}
                <button title="Move left" onClick={moveLeft}>
                    <img src={theme === "light" ? arrow_left : arrow_left_white} alt="Delete"></img>
                </button>
                <button title="Move right" onClick={moveRight}>
                    <img src={theme === "light" ? arrow_right : arrow_right_white} alt="Delete"></img>
                </button>
            </div>
        </div>
    )
}

export default RecipeImage;