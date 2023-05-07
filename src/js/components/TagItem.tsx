import style from '../../css/components/TagItem.module.css';
import { Tag } from '../interfaces/Tag'
import delete_image from '../../assets/trash.svg'
import Recipe from '../pages/Recipe';

interface TagItemProps{
    editing: boolean
    tag: Tag
    setRecipe: Function
    setAvailableTags: Function
}

function TagItem({editing, tag, setRecipe, setAvailableTags} : TagItemProps){

    function removeTag(){
        setRecipe((oldRecipe : Recipe) => {
            const updatedTags = oldRecipe.tags.filter((t) => t.tag_name !== tag.tag_name);
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
            {editing ? <button onClick={removeTag}><img src={delete_image}></img></button> : <></>}
        </div>
    )
}

export default TagItem;