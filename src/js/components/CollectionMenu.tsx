import style from '../../css/components/CollectionMenu.module.css';
import CollectionItem from './CollectionItem';
import CollectionCreator from './CollectionCreator';
import image from '../../assets/x.svg';
import image_white from '../../assets/x_white.svg'
import { useContext, useEffect, useState } from 'react';
import ThemeContext from '../context/ThemeContext';
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

    let [collections, setCollections] = useState<Collection[]>([]);

    useEffect(() => {
        getCollections().then((response) => {
            setCollections(response);
        })
    }, [])

    function hideCollectionPopup(){
        setShown(false);
    }

    return(
        <>
        {shown ? 
            <div className={`${style.popup_backdrop} ${shown ? style.shown : ''}`}>
                <div className={style.popup}>
                    <button title="Close collection popup" id={style.close_button} onClick={hideCollectionPopup}>
                        <img src={theme === "light" ? image : image_white} alt="Close" />
                    </button>
                    <h3>Add to collection</h3>
                    <ul>
                        {collections.map((collection : Collection) => <CollectionItem key={collection.name} collection={collection} recipeId={recipeId} recipeCollections={recipeCollections} setRecipe={setRecipe} />)}
                    </ul>
                    
                    <CollectionCreator parentShown={shown} setCollections={setCollections}/>
                </div>
            </div> : <></>
        }
        </>
    )
}

export default CollectionMenu;