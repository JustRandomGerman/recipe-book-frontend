import { useSearchParams } from 'react-router-dom';
import style from '../../css/pages/Search.module.css';
import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { Recipe } from '../interfaces/Recipe';
import { search } from '../../api';

function Search(){

    const [params, setParams] = useSearchParams();
    const [recipes, setRecipes] = useState<Recipe[]>();
    const [error, setError] = useState<string>("");
    const [warning, setWarning] = useState<string>("");

    useEffect( () => {
        //prevent the tags array in the request from being filled with an empty string when no tags are selected
        const tagsParam = params.get('tags');
        const tags = tagsParam ? tagsParam.split(',') : [];

        search(params.get('query')!, params.get('mode')!, tags).then((response) => {
            setError("");
            setRecipes(response);
            if(recipes?.length === 0){
                setWarning("No recipes found using your search criteria");
            }
        }).catch( (error) => {
            setError(error);
            setRecipes([]);
        })
    }, [params])

    return(
        <div className={style.search}>
            {((error === "" && warning === "")&& <h2>{`Results for: "${params.get('query')}"`}</h2>)}
            <p className='error'>{error}</p>
            <p className='warning'>{warning}</p>
            <div className={style.container}>
                {recipes?.map(( (recipe: Recipe) => <RecipeCard key={"searchResult_" + recipe.name} recipe={recipe} />))}
            </div>
        </div>
    )
}

export default Search;