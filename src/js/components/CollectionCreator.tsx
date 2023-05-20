import style from '../../css/components/CollectionCreator.module.css';
import { useState } from 'react';

interface CollectionCreatorProps{
    parent_shown: boolean;
}

function CollectionCreator( {parent_shown} : CollectionCreatorProps){
    
    let [shown, setShown] = useState<boolean>(false);
    
    function handleAddCollection(){
        setShown(true);
    }
    
    return(
        <>
            {(!shown && parent_shown) ? <button title="Show the collection creator" className={style.creator} onClick={handleAddCollection}>Add collection</button> : <></>}
            {(shown && parent_shown) ?
                <div className={style.creator}>
                    <input type="text"></input>
                    <br />
                    <button title="Add a new collection" id={style.create_button}>Add</button>
                </div>
                : <></>
            }
            
        </>
    )
}

export default CollectionCreator;