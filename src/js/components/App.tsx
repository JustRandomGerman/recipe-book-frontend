import '../../css/components/App.css';
import Layout from './Layout'
import Home from '../pages/Home';
import Recipe from '../pages/Recipe';
import Collection from '../pages/Collection';
import Search from '../pages/Search';
import CreateRecipe from '../pages/CreateRecipe'
import NotFound from '../pages/NotFound';
import ThemeContext from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  let [theme, setTheme] = useState("light");
  useEffect( () => {
    const colorScheme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? "dark" : "light"
    setTheme(colorScheme)
  }, [])
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    e.matches ? setTheme("dark") : setTheme("light");
  })

  return (
    <BrowserRouter>
    <ThemeContext.Provider value={theme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/recipe/:id" element={<Recipe/>} />
          <Route path="/collection/:id" element={<Collection />} />
          <Route path="/search" element={<Search/>} />
          <Route path="/create" element={<CreateRecipe />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeContext.Provider>
    </BrowserRouter>
  )
}

export default App;