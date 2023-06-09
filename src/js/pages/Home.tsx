import { useEffect, useState } from 'react';
import style from '../../css/pages/Home.module.css';
import RecipeCard from '../components/RecipeCard';
import { Recipe } from '../interfaces/Recipe';
import { Collection } from '../interfaces/Collection';
import { getRecentRecipes, getCollections } from '../../api';
import CollectionCard from '../components/CollectionCard';

function Home() {

    const [recipes, setRecipes] = useState<Recipe[]>();
    const [collections, setCollections] = useState<Collection[]>()

    useEffect( () => {
        getRecentRecipes(10).then((response) => {
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
            <h1>Collections</h1>
            <div className={style.container}>
                {collections?.map((collection: Collection) => <CollectionCard key={collection.id} collection={collection} />)}
            </div>
        </div>
    )
}
  
export default Home;