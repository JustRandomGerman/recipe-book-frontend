import '../../css/components/App.css';
import Layout from './Layout'
import Home from '../pages/Home';
import Recipe from '../pages/Recipe';
import Search from '../pages/Search';
import CreateRecipe from '../pages/CreateRecipe'
import NotFound from '../pages/NotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/recipe/:id" element={<Recipe/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/create" element={<CreateRecipe />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;