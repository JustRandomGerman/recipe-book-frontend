import style from '../../css/components/FilterMenu.module.css';
import FilterItem from './FilterItem';

interface FilterMenuProps{
    selectedTags : string[],
    setSelectedTags : Function
}

function FilterMenu( {selectedTags, setSelectedTags} : FilterMenuProps ){
    //TODO get from server
    let tags = [ "test1", "test2", "test3" ];
    
    return(
        <>
            <button id={style.filter}>Filter</button>
            <div className={style.filter_menu}>
                {tags.map(tag => <FilterItem name={tag} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>) }
                <p>{selectedTags}</p>
            </div>
        </>
    )
}

export default FilterMenu;