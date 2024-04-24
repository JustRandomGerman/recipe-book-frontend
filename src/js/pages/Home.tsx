import { useEffect, useState } from 'react';
import style from '../../css/pages/Home.module.css';
import RecipeCard from '../components/RecipeCard';
import { Recipe } from '../interfaces/Recipe';
import { Collection } from '../interfaces/Collection';
import { getRecentRecipes, getCollections } from '../../api';

interface HomeProps{
    setSidebarShown: Function
}

function Home( {setSidebarShown} : HomeProps) {

    const [recipes, setRecipes] = useState<Recipe[]>();

    useEffect( () => {
        getRecentRecipes(10).then((response) => {
            setRecipes(response);
        })
    }, [])

    return (
        <div className={style.home}>
            <h1>{"Recently viewed"}</h1>
            <div className={style.container}>
                {recipes?.map((recipe: Recipe) => <RecipeCard key={`recent_${recipe.id}_${recipe.name}`} recipe={recipe} setSidebarShown={setSidebarShown}/>)}
            </div>
        </div>
    )
}
  
export default Home;