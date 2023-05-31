import { useContext, useEffect, useState } from 'react';
import style from '../../css/components/FilterMenu.module.css';
import FilterItem from './FilterItem';
import filter_image from '../../assets/funnel.svg';
import filter_image_white from '../../assets/funnel_white.svg'
import { Tag } from '../interfaces/Tag'
import { getAvailableTags } from '../../api';
import ThemeContext from '../context/ThemeContext';

interface FilterMenuProps{
    selectedTags : Tag[],
    setSelectedTags : Function
}

function FilterMenu( {selectedTags, setSelectedTags} : FilterMenuProps ){
    const theme = useContext(ThemeContext)
    
    let [shown, setShown] = useState<boolean>(false);
    let [tags, setTags] = useState<Tag[]>([]);

    useEffect( () => {
        getAvailableTags().then((response) => {
          setTags(response);
        })
    }, [])
    
    function handleFilterButton(event : React.MouseEvent<HTMLElement>){
        event.preventDefault();
        setShown(!shown);
    }

    return(
        <>
            <button title="toggle filter menu" id={style.filter} onClick={handleFilterButton}>
                <img src={theme === "light" ? filter_image : filter_image_white} alt='Filter' />
            </button>
            {shown &&
                <div className={style.filter_menu}>
                    {tags.map(tag => <FilterItem key={tag.tag_name} currentTag={tag} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>) }
                </div>
            }
        </>
    )
}

export default FilterMenu;