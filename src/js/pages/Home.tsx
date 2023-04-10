import style from '../../css/pages/Home.module.css';
import RecipeCard from '../components/RecipeCard';

function Home() {

  return (
    <div className={style.home}>
      <h1>Recent</h1>
      <div className={style.container}>
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </div>
      <h1>Random</h1>
    </div>
  )
}
  
export default Home;