import style from '../../css/components/TagList.module.css';
import TagItem from './TagItem';
import { Tag } from '../interfaces/Tag'
import { useEffect, useState } from 'react';

import axios from 'axios'

interface TagListProps{
    editing: boolean
    tags: Tag[]
    setRecipe: Function
}

function TagList( {editing, tags, setRecipe} : TagListProps){

    let [availableTags, setAvailableTags] = useState<Tag[]>([]);
    let [allAvailableTags, setAllAvailableTags] = useState<Tag[]>([]);

    useEffect( () => {
        axios.get<Tag[]>("http://localhost:3000/tags/available").then((response) => {
          setAvailableTags(response.data);
          //TODO remove tags the recipe has from available tags
          setAllAvailableTags(response.data);
        })
    }, [])

    function addTag(event: React.ChangeEvent<HTMLSelectElement>) {
        const tagName = event.target.value;
        const tag = { tag_name: tagName };
        setRecipe((prevRecipe: any) => ({
            ...prevRecipe,
            tags: [...prevRecipe.tags, tag],
        }));
        //TODO remove tag from available tags
    }

    return(
        <section className={style.tag_list}>
            <h2>Tags</h2>
            <div className={style.tags}>
                {tags.map(tag => <TagItem key={tag.tag_name} editing={editing} tag={tag} setRecipe={setRecipe} />)}
                {editing ? 
                    <select id={style.tag_select} onChange={addTag}>
                        <option value="Add Tag" selected disabled>Add Tag</option>
                        {availableTags.map((availableTag, index) => <option key={index} value={availableTag.tag_name}>{availableTag.tag_name}</option>)}
                    </select> 
                : <></>}
            </div>
        </section>
    )
}

export default TagList;