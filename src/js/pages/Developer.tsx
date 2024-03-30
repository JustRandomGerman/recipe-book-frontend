import { useState } from 'react';
import style from '../../css/pages/Developer.module.css';
import { addAvailableTag } from '../../api';
function Developer() {

    const [newTag, setNewTag] = useState<string>("")

    function handleInput(event: React.FormEvent<HTMLInputElement>) {
        const value = event.currentTarget.value;
        setNewTag(value);
    }

    function handleSaveNewTag(){
        addAvailableTag(newTag).then((response) => {
            console.log(response);
        }).catch( (error) => {
            console.error(error);
        })
    }

    return (
        <div className={style.developer}> 
            <h1>Developer Page</h1>
            <h2>Recipe export</h2>
            <a href='http://localhost:3000/developer/export' target='_blank'>Export all recipes</a>
            <h2>Add new Tag</h2>
            <input type='text' placeholder='New tag' onInput={handleInput}/>
            <button title='Add new tag' onClick={handleSaveNewTag}>Save tag</button>
        </div>
    )
}
  
export default Developer;