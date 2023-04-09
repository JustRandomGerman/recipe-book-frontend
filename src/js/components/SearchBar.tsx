import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/components/SearchBar.css'

function SearchBar(){
    const navigate = useNavigate();
    let [searchString, setSearchString] = useState("");

    function startSearch(){
        navigate("/search/" + searchString);
    }

    return(
        <div className='search'>
            <button id='filter'>Filter</button>
            <select name="search_mode">
                <option value="recipe">Recipe</option>
                <option value="ingredient">Ingredient</option>
            </select>
            <input type="search" value={searchString} onInput={e => setSearchString(e.currentTarget.value)}/>
            <button id='begin_search' onClick={startSearch}>Search</button>
        </div>
    )
}

export default SearchBar;