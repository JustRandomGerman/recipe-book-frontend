import style from '../../css/components/TagList.module.css';
import { Tag } from '../interfaces/Tag'

interface TagListProps{
    editing: boolean
    tags: Tag[]
}

function TagList( {editing, tags} : TagListProps){

    return(
        <section className={style.tag_list}>
            <h2>Tags</h2>
            <div className={style.tags}>
                {tags.map(tag => {
                    return <p key={tag.name}>{tag.name}</p>
                })}
            </div>
        </section>
    )
}

export default TagList;