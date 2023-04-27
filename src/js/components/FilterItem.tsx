import style from '../../css/components/FilterItem.module.css';
import { Tag } from '../interfaces/Tag'

interface FilterItemProps{
    currentTag: Tag;
    selectedTags: Tag[],
    setSelectedTags: Function
}

function FilterItem( {currentTag, selectedTags, setSelectedTags} : FilterItemProps){
    
    function handleSelectChange(event : React.ChangeEvent<HTMLInputElement>){
        if(event.target.checked === true){
            setSelectedTags((prevTags : Tag[]) => [
            ...prevTags,
            currentTag
            ])
        }
        else{
            setSelectedTags((prevTags : Tag[]) => {
                return prevTags.filter((tag: Tag) => tag.name !== currentTag.name)
            })
        }
    }
    
    return (
        <fieldset className={style.filter_item}>
            <input type="checkbox" id={currentTag.name} name={currentTag.name} checked={selectedTags.some((tag) => tag.name === currentTag.name)} onChange={handleSelectChange}/>
            <label htmlFor={currentTag.name}>{currentTag.name}</label>
        </fieldset>
    )
}

export default FilterItem;