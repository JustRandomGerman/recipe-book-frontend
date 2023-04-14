import { MouseEventHandler, useState } from 'react';
import style from '../../css/components/FilterMenu.module.css';
import FilterItem from './FilterItem';
import image from '../../assets/funnel.svg';

interface FilterMenuProps{
    selectedTags : string[],
    setSelectedTags : Function
}

function FilterMenu( {selectedTags, setSelectedTags} : FilterMenuProps ){
    let [shown, setShown] = useState<boolean>(false);
    
    //TODO get from server
    let tags = [ "test1", "test2", "test3" ];
    
    function handleFilterButton(event : React.MouseEvent<HTMLElement>){
        event.preventDefault();
        setShown(!shown);
    }

    return(
        <>
            <button id={style.filter} onClick={handleFilterButton}>
                <img src={image} alt='Filter' />
            </button>
            {shown ? 
                <div className={style.filter_menu}>
                    {tags.map(tag => <FilterItem name={tag} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>) }
                    <p>{selectedTags}</p>
                </div> : ''
            }
        </>
    )
}

export default FilterMenu;