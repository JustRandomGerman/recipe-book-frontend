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
            <button className={`${style.creator} ${(!shown && parent_shown) ? style.shown : ''}`} onClick={handleAddCollection}>Add collection</button>
            <div className={`${style.creator} ${(shown && parent_shown) ? style.shown : ''}`}>
                <input type="text"></input>
                <br />
                <button id={style.create_button}>Add</button>
            </div>
        </>
    )
}

export default CollectionCreator;