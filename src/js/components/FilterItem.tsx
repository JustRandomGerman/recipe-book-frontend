import style from '../../css/components/FilterItem.module.css';
import { Tag } from '../interfaces/Tag'

interface FilterItemProps{
    currentTag: Tag;
    selectedTags: Tag[],
    setSelectedTags: Function
}

function FilterItem( {currentTag, selectedTags, setSelectedTags}: FilterItemProps){
    
    function handleSelectChange(event: React.ChangeEvent<HTMLInputElement>){
        if(event.target.checked === true){
            setSelectedTags((prevTags: Tag[]) => [
            ...prevTags,
            currentTag
            ])
        }
        else{
            setSelectedTags((prevTags: Tag[]) => {
                return prevTags.filter((tag: Tag) => tag.tag_name !== currentTag.tag_name)
            })
        }
    }
    
    return (
        <fieldset className={style.filter_item}>
            <input type="checkbox" id={currentTag.tag_name} name={currentTag.tag_name} checked={selectedTags.some((tag) => tag.tag_name === currentTag.tag_name)} onChange={handleSelectChange}/>
            <label htmlFor={currentTag.tag_name}>{currentTag.tag_name}</label>
        </fieldset>
    )
}

export default FilterItem;