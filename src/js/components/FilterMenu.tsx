import { useEffect, useState } from 'react';
import style from '../../css/components/FilterMenu.module.css';
import FilterItem from './FilterItem';
import image from '../../assets/funnel.svg';
import { Tag } from '../interfaces/Tag'
import axios from 'axios';

interface FilterMenuProps{
    selectedTags : Tag[],
    setSelectedTags : Function
}

function FilterMenu( {selectedTags, setSelectedTags} : FilterMenuProps ){
    let [shown, setShown] = useState<boolean>(false);
    let [tags, setTags] = useState<Tag[]>([]);

    useEffect( () => {
        axios.get<Tag[]>("http://localhost:3000/tags/available").then((response) => {
          setTags(response.data);
        })
    }, [])
    
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
                    {tags.map(tag => <FilterItem key={tag.tag_name} currentTag={tag} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>) }
                </div> : <></>
            }
        </>
    )
}

export default FilterMenu;