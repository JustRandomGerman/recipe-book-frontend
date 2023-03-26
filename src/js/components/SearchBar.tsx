import '../../css/components/SearchBar.css'

function SearchBar(){

    return(
        <div className='search'>
            <select name="search_mode">
                <option value="recipe">Recipe</option>
                <option value="ingredient">Ingredient</option>
            </select>
            <input type="search"></input>
            <button>Search</button>
        </div>
    )
}

export default SearchBar;