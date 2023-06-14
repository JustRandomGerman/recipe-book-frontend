import style from '../../css/components/CollectionMenu.module.css';
import CollectionItem from './CollectionItem';
import CollectionCreator from './CollectionCreator';
import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Collection } from '../interfaces/Collection';
import { getCollections } from '../../api';

interface CollectionMenuProps {
    shown : boolean
    setShown : Function
    recipeId : number
    recipeCollections : Collection[]
    setRecipe : Function
}

function CollectionMenu( { shown, setShown, recipeId, recipeCollections, setRecipe } : CollectionMenuProps){
    const theme = useContext(ThemeContext);

    const dialogRef = useRef<HTMLDialogElement>(null);

    const [collections, setCollections] = useState<Collection[]>([]);

    useEffect(() => {
        getCollections().then((response) => {
            setCollections(response);
        })
    }, [])

    useEffect(() => {
        if(shown){
            dialogRef.current?.showModal();
        }
        else{
            dialogRef.current?.close();
        }
    }, [shown])

    function hideCollectionPopup(){
        setShown(false);
    }

    return(
        <dialog className={style.popup} ref={dialogRef}>
            <button title="Close collection popup" id={style.close_button} onClick={hideCollectionPopup}>
                <img src={theme.xImage} alt="Close" />
            </button>
            <h3>Add to collection</h3>
            <ul>
                {collections.map((collection : Collection) => <CollectionItem key={collection.name} collection={collection} recipeId={recipeId} recipeCollections={recipeCollections} setRecipe={setRecipe} />)}
            </ul>
            
            <CollectionCreator parentShown={shown} setCollections={setCollections}/>
        </dialog>
    )
}

export default CollectionMenu;