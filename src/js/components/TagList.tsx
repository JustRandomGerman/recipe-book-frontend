import style from '../../css/components/TagList.module.css';
import TagItem from './TagItem';
import { Tag } from '../interfaces/Tag'

interface TagListProps{
    editing: boolean
    tags: Tag[]
}

function TagList( {editing, tags} : TagListProps){

    function addTag(){
        //TODO
    }

    return(
        <section className={style.tag_list}>
            <h2>Tags</h2>
            <div className={style.tags}>
                {tags.map(tag => <TagItem key={tag.name} editing={editing} tag={tag} />)}
                {editing ? <button id={style.tag_button} onClick={addTag}>+</button> : <></>}
            </div>
        </section>
    )
}

export default TagList;