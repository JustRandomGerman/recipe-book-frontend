import { useSearchParams } from 'react-router-dom';
import style from '../../css/pages/Search.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import { Recipe } from '../interfaces/Recipe';

function Search(){

    const [params, setParams] = useSearchParams();
    let [recipes, setRecipes] = useState<Recipe[]>();

    useEffect( () => {
        axios.post('http://localhost:3000/search', {
            query: params.get('query'),
            mode: params.get('mode'),
            tags: params.get('tags')?.split(',')
        }).then( (response) => {
            setRecipes(response.data)
        })
    }, [params])

    return(
        <div className={style.search}>
            <h2>{"Results for: \"" + params.get('query') + "\""}</h2>
            <div className={style.container}>
                {recipes?.map(( (recipe: Recipe) => <RecipeCard key={"searchResult_" + recipe.name} recipe={recipe} />))}
            </div>
        </div>
    )
}

export default Search;