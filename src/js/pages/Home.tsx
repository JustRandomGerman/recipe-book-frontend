import { useEffect, useState } from 'react';
import style from '../../css/pages/Home.module.css';
import RecipeCard from '../components/RecipeCard';
import { Recipe } from '../interfaces/Recipe';
import { Collection } from '../interfaces/Collection';
import { getRecipes, getCollections } from '../../api';

function Home() {

    const [recipes, setRecipes] = useState<Recipe[]>();
    const [collections, setCollections] = useState<Collection[]>()

    useEffect( () => {
        getRecipes().then((response) => {
            setRecipes(response);
        })
        getCollections().then((response) => {
            setCollections(response);
        })
    }, [])

    return (
        <div className={style.home}>
            <h1>{"Recently viewed"}</h1>
            <div className={style.container}>
                {recipes?.map((recipe: Recipe) => <RecipeCard key={`recent_${recipe.id}_${recipe.name}`} recipe={recipe} />)}
            </div>
        </div>
    )
}
  
export default Home;