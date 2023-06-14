import { useContext, useEffect, useRef, useState } from 'react';
import style from '../../css/components/FilterMenu.module.css';
import FilterItem from './FilterItem';
import { Tag } from '../interfaces/Tag'
import { getAvailableTags } from '../../api';
import { ThemeContext } from '../context/ThemeContext';

interface FilterMenuProps{
    selectedTags: Tag[],
    setSelectedTags: Function
}

function FilterMenu( {selectedTags, setSelectedTags}: FilterMenuProps ){
    const theme = useContext(ThemeContext);

    const dialogRef = useRef<HTMLDialogElement>(null);
    
    const [shown, setShown] = useState<boolean>(false);
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect( () => {
        getAvailableTags().then((response) => {
          setTags(response);
        })
    }, [])
    
    function handleFilterButton(event: React.MouseEvent<HTMLElement>){
        event.preventDefault();
        if(!shown){
            dialogRef.current?.show();
            setShown(true);
        }
        else{
            dialogRef.current?.close();
            setShown(false);
        }
    }

    return(
        <>
            <button title="toggle filter menu" id={style.filter} onClick={handleFilterButton}>
                <img src={theme.filterImage} alt='Filter' />
            </button>
            <dialog className={style.filter_menu} ref={dialogRef}>
                {tags.map(tag => <FilterItem key={tag.tag_name} currentTag={tag} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>) }
            </dialog>
        </>
    )
}

export default FilterMenu;