import '../../css/pages/Recipe.css';

function Recipe(){

    return(
        <div className='recipe_background'>
            <div className="recipe">
                <img alt="image of food"></img>
                <button>Edit</button>
                <h1>Recipe name</h1>
                <h2>Ingredients</h2>
                <h2>Instructions</h2>
                <p>Do this and that</p>
            </div>
        </div>
    )
}

export default Recipe;