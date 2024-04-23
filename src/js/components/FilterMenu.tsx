import { useContext, useEffect, useRef, useState } from 'react';
import style from '../../css/components/FilterMenu.module.css';
import FilterItem from './FilterItem';
import { Tag } from '../interfaces/Tag'
import { getAvailableTags } from '../../api';
import { ThemeContext } from '../context/ThemeContext';

interface FilterMenuProps{
    selectedTags: Tag[]
    setSelectedTags: Function
    shown: boolean
    setShown: Function
}

function FilterMenu( {selectedTags, setSelectedTags, shown, setShown}: FilterMenuProps ){
    const theme = useContext(ThemeContext);

    const dialogRef = useRef<HTMLDialogElement>(null);
    
    
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect( () => {
        getAvailableTags().then((response) => {
          setTags(response);
        })
    }, [])

    useEffect(() => {
        if(shown){
            dialogRef.current?.show();
        }
        else{
            dialogRef.current?.close();
        }
    }, [shown])
    
    function handleFilterButton(event: React.MouseEvent<HTMLElement>){
        event.preventDefault();
        if(!shown){
            setShown(true);
        }
        else{
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