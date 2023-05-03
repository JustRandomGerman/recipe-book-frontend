import style from '../../css/components/RecipeCard.module.css';
import image2 from '../../assets/marmorkuchen.jpg';

interface RecipeImageProps{
    editing: boolean,
    image: string
}

function RecipeImage ({ editing, image } : RecipeImageProps){


    return(
        <img src={image2} alt="image of food"></img>
    )
}

export default RecipeImage;