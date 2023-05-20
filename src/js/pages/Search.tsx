import { useSearchParams } from 'react-router-dom';
import style from '../../css/pages/Search.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import { Recipe } from '../interfaces/Recipe';

function Search(){

    const [params, setParams] = useSearchParams();
    let [recipes, setRecipes] = useState<Recipe[]>();
    let [error, setError] = useState<string>("");

    useEffect( () => {
        //prevent the tags array in the request from being filled with an empty string when no tags are selected
        const tagsParam = params.get('tags');
        const tags = tagsParam ? tagsParam.split(',') : [];

        axios.post('http://localhost:3000/search', {
            query: params.get('query'),
            mode: params.get('mode'),
            tags: tags
        }).then( (response) => {
            setError("");
            setRecipes(response.data)
        }).catch( (error) => {
            setError(error.response.data.message);
            setRecipes([]);
        })
    }, [params])

    return(
        <div className={style.search}>
            {(error === "" ? <h2>{`Results for: "${params.get('query')}"`}</h2> : <></>)}
            <p className='warning'>{error}</p>
            <div className={style.container}>
                {recipes?.map(( (recipe: Recipe) => <RecipeCard key={"searchResult_" + recipe.name} recipe={recipe} />))}
            </div>
        </div>
    )
}

export default Search;