import { ChangeEventHandler } from 'react';
import style from '../../css/components/FilterItem.module.css';

interface FilterItemProps{
    name: string;
    selectedTags: string[],
    setSelectedTags: Function
}

function FilterItem( {name, selectedTags, setSelectedTags} : FilterItemProps){
    
    function handleSelectChange(event : React.ChangeEvent<HTMLInputElement>){
        if(event.target.checked === true){
            setSelectedTags((prevTags : string[]) => [
            ...prevTags,
            name
            ])
        }
        else{
            setSelectedTags((prevTags : string[]) => {
                return prevTags.filter((tag : string) => tag !== name)
            })
        }
    }
    
    return (
        <fieldset className={style.filter_item}>
            <input type="checkbox" id={name} name={name} onChange={handleSelectChange}/>
            <label htmlFor={name}>{name}</label>
        </fieldset>
    )
}

export default FilterItem;