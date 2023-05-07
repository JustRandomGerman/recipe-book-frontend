import style from '../../css/components/RecipeCard.module.css';

interface RecipeImageProps{
    editing: boolean,
    image: string
}

function RecipeImage ({ editing, image } : RecipeImageProps){


    return(
        <img src={image} alt="image of food"></img>
    )
}

export default RecipeImage;