import style from '../../css/components/TagItem.module.css';
import { Tag } from '../interfaces/Tag'
import Recipe from '../pages/Recipe';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

interface TagItemProps{
    editing: boolean
    tag: Tag
    setRecipe: Function
    setAvailableTags: Function
}

function TagItem({editing, tag, setRecipe, setAvailableTags} : TagItemProps){
    const theme = useContext(ThemeContext)

    function removeTag(){
        setRecipe((oldRecipe : Recipe) => {
            const updatedTags = oldRecipe.tags.filter((t : Tag) => t.tag_name !== tag.tag_name);
            return {...oldRecipe, tags: updatedTags};
        });
        setAvailableTags((oldTags : Tag[] ) => [
            ...oldTags,
            tag
        ]);
    }

    return(
        <div className={style.tag}>
            <p key={tag.tag_name}>{tag.tag_name}</p>
            {editing && <button title="Delete tag" onClick={removeTag}><img src={theme.deleteImage}></img></button>}
        </div>
    )
}

export default TagItem;