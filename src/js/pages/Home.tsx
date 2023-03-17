import '../../css/pages/Home.css'
import RecipeCard from '../components/RecipeCard';

function Home() {

  return (
    <div className='home'>
      <h1>Recent</h1>
      <div className='container'>
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