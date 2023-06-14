import { createCollection } from '../../api';
import style from '../../css/components/CollectionCreator.module.css';
import { useState } from 'react';
import { Collection } from '../interfaces/Collection';

interface CollectionCreatorProps{
    parentShown: boolean
    setCollections: Function
}

function CollectionCreator( {parentShown, setCollections}: CollectionCreatorProps){
    
    const [shown, setShown] = useState<boolean>(false);
    const [currentText, setCurrentText] = useState<string>("");
    
    function handleShowCreator(){
        setShown(true);
    }

    function handleInput(event: React.FormEvent<HTMLInputElement>){
        const value = event.currentTarget.value;
        setCurrentText(value);
    }
    
    function handleAddCollection(){
        createCollection({name: currentText}).then((response) => {
            setCollections((oldCollections: Collection[]) => [...oldCollections, response]);
        })
    }
    
    return(
        <>
            {(!shown && parentShown) && <button title="Show the collection creator" className={style.creator} onClick={handleShowCreator}>Add collection</button>}
            {(shown && parentShown) &&
                <div className={style.creator}>
                    <input type="text" value={currentText} placeholder="Name of the new collection" onInput={handleInput}></input>
                    <br />
                    <button title="Add a new collection" id={style.create_button} onClick={handleAddCollection}>Add</button>
                </div>
            }
            
        </>
    )
}

export default CollectionCreator;