import '../../css/components/RecipeCard.css';
import { Link } from 'react-router-dom';

function RecipeCard(){

    return(
        <div className='recipeCard'>
            <Link to="/recipe">
                <div>
                    <img src='test.png' alt='image'></img>
                    <h1>Name</h1>
                </div>
            </Link>
        </div>
    )
}

export default RecipeCard;