import style from '../../css/components/CollectionMenu.module.css';
import CollectionItem from './CollectionItem';
import CollectionCreator from './CollectionCreator';
import image from '../../assets/x.svg';

interface CollectionMenuProps {
    shown: boolean,
    setShown: Function
}

function CollectionMenu( { shown, setShown } : CollectionMenuProps){

    let collections = [{id: 1, name: "first collection"}, {id: 2, name: "second collection"}, {id: 3, name: "third collection"}]

    function hideCollectionPopup(){
        setShown(false);
    }

    return(
        <div className={`${style.popup_backdrop} ${shown ? style.shown : ''}`}>
            <div className={style.popup}>
                <button id={style.close_button} onClick={hideCollectionPopup}>
                    <img src={image} alt="Close" />
                </button>
                <h3>Add to collection</h3>
                <ul>
                    {collections.map(collection => <CollectionItem key={collection.name} name={collection.name} />)}
                </ul>
                
                <CollectionCreator parent_shown={shown} />
            </div>
        </div>
    )
}

export default CollectionMenu;