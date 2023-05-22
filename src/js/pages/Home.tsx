import { useEffect, useState } from 'react';
import style from '../../css/pages/Home.module.css';
import RecipeCard from '../components/RecipeCard';
import { Recipe } from '../interfaces/Recipe';
import { getRecipes } from '../../api';

function Home() {

    let [recipes, setRecipes] = useState<Recipe[]>();

    useEffect( () => {
        getRecipes().then((response) => {
            setRecipes(response);
        })
    }, [])

    return (
        <div className={style.home}>
            <h1>Recent</h1>
            <div className={style.container}>
                {recipes?.map( (recipe: Recipe)=> <RecipeCard key={"recent_" + recipe.name} recipe={recipe} />)}
            </div>
            <h1>Random</h1>
        </div>
    )
}
  
export default Home;