import style from '../../css/components/RecipeTags.module.css';
import TagItem from './TagItem';
import { Tag } from '../interfaces/Tag'
import { useEffect, useState } from 'react';

import axios from 'axios'

interface RecipeTagsProps{
    editing: boolean
    tags: Tag[]
    setRecipe: Function
}

function RecipeTags( {editing, tags, setRecipe} : RecipeTagsProps){

    let [availableTags, setAvailableTags] = useState<Tag[]>([]);

    useEffect( () => {
        axios.get<Tag[]>("http://localhost:3000/tags/available").then((response) => {
            setAvailableTags(response.data.filter(tag => {
                const isTagInRecipe = tags.some(recipeTag => recipeTag.tag_name === tag.tag_name);
                return !isTagInRecipe;
              }));
        })
    }, [])

    function addTag(event: React.ChangeEvent<HTMLSelectElement>) {
        const tagName = event.target.value;
        const tag = { tag_name: tagName };
        setRecipe((prevRecipe: any) => ({
            ...prevRecipe,
            tags: [...prevRecipe.tags, tag],
        }));
        setAvailableTags((oldTags : Tag[]) => {
            return oldTags.filter((t) => t.tag_name !== tagName)
        });
    }

    return(
        <section className={style.tag_list}>
            <h2>Tags</h2>
            <div className={style.tags}>
                {tags.map(tag => <TagItem key={tag.tag_name} editing={editing} tag={tag} setRecipe={setRecipe} setAvailableTags={setAvailableTags} />)}
                {editing ? 
                    <select title="Add a new tag" id={style.tag_select} onChange={addTag} value={"Add Tag"}>
                        <option value="Add Tag" disabled>Add Tag</option>
                        {availableTags.map((availableTag, index) => <option key={index} value={availableTag.tag_name}>{availableTag.tag_name}</option>)}
                    </select> 
                : <></>}
            </div>
        </section>
    )
}

export default RecipeTags;