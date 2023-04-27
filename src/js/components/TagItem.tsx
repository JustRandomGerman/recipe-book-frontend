import style from '../../css/components/TagItem.module.css';
import { Tag } from '../interfaces/Tag'
import delete_image from '../../assets/trash.svg'

interface TagItemProps{
    editing: boolean
    tag: Tag
}

function TagItem({editing, tag} : TagItemProps){

    function removeTag(){
        //TODO
    }

    return(
        <div className={style.tag}>
            <p key={tag.name}>{tag.name}</p>
            {editing ? <button><img src={delete_image}></img></button> : <></>}
        </div>
    )
}

export default TagItem;