import '../../css/components/App.css';
import Layout from './Layout'
import Home from '../pages/Home';
import Recipe from '../pages/Recipe';
import Collection from '../pages/Collection';
import Search from '../pages/Search';
import CreateRecipe from '../pages/CreateRecipe';
import Developer from '../pages/Developer';
import APIDocumentation from '../pages/APIDocumentation';
import NotFound from '../pages/NotFound';
import { ThemeProvider } from '../context/ThemeContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {

    const [sidebarShown, setSidebarShown] = useState<boolean>(false);

    return (
        <BrowserRouter>
            <ThemeProvider>
                <Routes>
                    <Route path="/" element={<Layout sidebarShown={sidebarShown} setSidebarShown={setSidebarShown}/>}>
                        <Route index element={<Home setSidebarShown={setSidebarShown}/>} />
                        <Route path="/recipe/:id" element={<Recipe/>} />
                        <Route path="/collection/:id" element={<Collection />} />
                        <Route path="/search" element={<Search/>} />
                        <Route path="/create" element={<CreateRecipe />} />
                        <Route path="/developer" element={<Developer />} />
                        <Route path="/api-documentation" element={<APIDocumentation />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App;