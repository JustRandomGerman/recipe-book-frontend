import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterMenu from './FilterMenu';
import style from '../../css/components/SearchBar.module.css';
import image from '../../assets/search.svg';

function SearchBar(){
    const navigate = useNavigate();
    let [searchString, setSearchString] = useState<string>("");
    let [searchMode, setSearchMode] = useState<string>("recipe");
    let [searchFilterTags, setSearchFilterTags] = useState<string[]>([]);

    function handleSelectChange(event : React.ChangeEvent<HTMLSelectElement>){
        setSearchMode(event.target.value);
    }

    function handleStartSearch(event : React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        if(! (searchString === "")){
            //TODO add tags to url parameters
            navigate("/search?query=" + searchString + "&mode=" + searchMode);
        }
    }

    return(
        <form className={style.search} onSubmit={handleStartSearch}>
            <FilterMenu selectedTags={searchFilterTags} setSelectedTags={setSearchFilterTags}/>
            <select name="search_mode" value={searchMode} onChange={handleSelectChange} defaultValue='recipe'>
                <option value="recipe">Recipe</option>
                <option value="ingredient">Ingredient</option>
            </select>
            <input type="search" value={searchString} onInput={e => setSearchString(e.currentTarget.value)}/>
            <button id={style.begin_search}>
                <img src={image} alt='search' />
            </button>
        </form>
    )
}

export default SearchBar;