import { useEffect, useState } from 'react';
import style from '../../css/pages/Home.module.css';
import RecipeCard from '../components/RecipeCard';
import { Recipe } from '../interfaces/Recipe';
import axios from 'axios';

function Home() {

  let [recipes, setRecipes] = useState<Recipe[]>();

  useEffect( () => {
    axios.get("http://localhost:3000/recipes").then((response) => {
      setRecipes(response.data);
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