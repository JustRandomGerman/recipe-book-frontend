import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterMenu from './FilterMenu';
import style from '../../css/components/SearchBar.module.css';
import search_image from '../../assets/search.svg';
import search_image_white from '../../assets/search_white.svg'
import { Tag } from '../interfaces/Tag'
import ThemeContext from '../context/ThemeContext';

function SearchBar(){
    const theme = useContext(ThemeContext)

    const navigate = useNavigate();
    let [searchString, setSearchString] = useState<string>("");
    let [searchMode, setSearchMode] = useState<string>("recipe");
    let [searchFilterTags, setSearchFilterTags] = useState<Tag[]>([]);

    function handleSelectChange(event : React.ChangeEvent<HTMLSelectElement>){
        setSearchMode(event.target.value);
    }

    function handleStartSearch(event : React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        if(! (searchString === "")){
            navigate("/search?query=" + searchString + "&mode=" + searchMode + "&tags=" + searchFilterTags.map(tag => tag.tag_name));
        }
    }

    return(
        <form className={style.search} onSubmit={handleStartSearch}>
            <select title="Select diferent search modes" name="search_mode" value={searchMode} onChange={handleSelectChange}>
                <option value="recipe">Recipe</option>
                <option value="ingredient">Ingredient</option>
            </select>
            <input type="search" value={searchString} onInput={e => setSearchString(e.currentTarget.value)}/>
            <button title="Search" id={style.begin_search}>
                <img src={theme === "light" ? search_image : search_image_white} alt='search' />
            </button>
            <FilterMenu selectedTags={searchFilterTags} setSelectedTags={setSearchFilterTags}/>
        </form>
    )
}

export default SearchBar;