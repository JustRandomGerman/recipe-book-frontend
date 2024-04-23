import style from '../../css/components/CollectionMenu.module.css';
import CollectionItem from './CollectionItem';
import CollectionCreator from './CollectionCreator';
import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Collection } from '../interfaces/Collection';
import { getCollections } from '../../api';

interface CollectionMenuProps {
    shown: boolean
    setShown: Function
    recipeId: number
    recipeCollections: Collection[]
    setRecipe: Function
}

function CollectionMenu( { shown, setShown, recipeId, recipeCollections, setRecipe }: CollectionMenuProps){
    const theme = useContext(ThemeContext);

    const dialogRef = useRef<HTMLDialogElement>(null);

    const [collections, setCollections] = useState<Collection[]>([]);
    const [success, setSuccess] = useState<string>("");

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

    function handleHideCollectionPopup(){
        setShown(false);
    }

    return(
        <dialog className={style.popup} ref={dialogRef}>
            <button title="Close collection popup" id={style.close_button} onClick={handleHideCollectionPopup}>
                <img src={theme.xImage} alt="Close" />
            </button>
            <h3>Add to collection</h3>
            <p className='success'>{success}</p>
            <ul>
                {collections.map((collection: Collection) => <CollectionItem key={collection.name} collection={collection} recipeId={recipeId} recipeCollections={recipeCollections} setRecipe={setRecipe} setSuccess={setSuccess}/>)}
            </ul>
            <hr />
            <CollectionCreator parentShown={shown} setCollections={setCollections}/>
        </dialog>
    )
}

export default CollectionMenu;