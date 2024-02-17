import { useContext, useState } from 'react';
import { ImagePath } from '../interfaces/ImagePath';
import { ThemeContext } from '../context/ThemeContext';
import ImageItem from './ImageItem';
import { Recipe } from '../interfaces/Recipe';
import arrow_left_grey from '../../assets/caret-left-grey.svg';
import arrow_right_grey from '../../assets/caret-right-grey.svg';
import style from '../../css/components/RecipeImage.module.css';

interface RecipeImageProps{
    editing: boolean,
    image_paths: ImagePath[],
    setRecipe: Function
}

function RecipeImage ({ editing, image_paths, setRecipe }: RecipeImageProps){
    const theme = useContext(ThemeContext);

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    function handleMoveLeft(){
        if(currentIndex > 0){
            setCurrentIndex((oldIndex) => oldIndex - 1);
        }
    }

    function handleMoveRight(){
        if(currentIndex < (image_paths.length - 1)){
            setCurrentIndex((oldIndex) => oldIndex + 1);
        }
    }

    function handleDeleteImage(){
        if(image_paths.length === 1){
            //only one image exists, so instead of completely deleting make path empty to show upload dialog
            setRecipe((oldRecipe: Recipe) => {
                const updatedImagePaths = [...oldRecipe.image_paths];
                updatedImagePaths[currentIndex] = {path: ""};
                return {...oldRecipe, image_paths: updatedImagePaths};
            })
        }
        else{
            //there is more than one image, so it can be deleted
            setCurrentIndex((oldIndex) => {
                if(oldIndex === 0){
                    //the first image gets deleted and there is more than one image, so set the current index to 0
                    return 0;
                }
                else{
                    //there definetely is a previous image, so the new index is the previous image
                    return oldIndex - 1;
                }
            })
            setRecipe((oldRecipe: Recipe) => {
                const updatedImagePaths = [...oldRecipe.image_paths];
                updatedImagePaths.splice(currentIndex, 1);
                return {...oldRecipe, image_paths: updatedImagePaths};
            })
        }
    }

    function handleAddImage(){
        //TODO check if an empty image already exists
        setRecipe((oldRecipe: Recipe) => {
            const updatedImagePaths = [...oldRecipe.image_paths, { path: "" }];
            return { ...oldRecipe, image_paths: updatedImagePaths };
        })
        setCurrentIndex(image_paths.length);
    }

    return(
        <div className={style.images}>
            {image_paths.map( (image_path: ImagePath, index: number) => {
                return <ImageItem key={image_path.path} index={index} currentIndex={currentIndex} image_path={image_path} setRecipe={setRecipe} />
            })}
            <div className={style.image_buttons}>
                {editing && <>
                    <button title="Delete the current image" onClick={handleDeleteImage}>
                        <img src={theme.deleteImage} alt="Delete"></img>
                    </button>
                    <button title="Add a new image" onClick={handleAddImage}>
                        <img src={theme.plusImage} alt="Add an image"></img>
                    </button>
                </>}
                <button title="Move left" onClick={handleMoveLeft}>
                    <img src={(currentIndex === 0) ? arrow_left_grey: theme.arrowLeftImage} alt="Move left"></img>
                </button>
                <button title="Move right" onClick={handleMoveRight}>
                    <img src={(currentIndex === (image_paths.length - 1)) ? arrow_right_grey: theme.arrowRightImage} alt="Move right"></img>
                </button>
            </div>
        </div>
    )
}

export default RecipeImage;