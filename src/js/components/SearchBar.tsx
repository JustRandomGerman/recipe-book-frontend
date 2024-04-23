import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterMenu from './FilterMenu';
import style from '../../css/components/SearchBar.module.css';
import { Tag } from '../interfaces/Tag'
import { ThemeContext } from '../context/ThemeContext';

interface SearchBarProps{
    setSidebarShown: Function
}

function SearchBar( {setSidebarShown} : SearchBarProps){
    const theme = useContext(ThemeContext)

    const navigate = useNavigate();
    const [searchString, setSearchString] = useState<string>("");
    const [searchMode, setSearchMode] = useState<string>("recipe");
    const [searchFilterTags, setSearchFilterTags] = useState<Tag[]>([]);
    const [filterMenuShown, setFilterMenuShown] = useState<boolean>(false);

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>){
        setSearchMode(event.target.value);
    }

    function handleStartSearch(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        if(! (searchString === "")){
            setFilterMenuShown(false);
            setSidebarShown(false);
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
                <img src={theme.searchImage} alt='search' />
            </button>
            <FilterMenu selectedTags={searchFilterTags} setSelectedTags={setSearchFilterTags} shown={filterMenuShown} setShown={setFilterMenuShown} />
        </form>
    )
}

export default SearchBar;