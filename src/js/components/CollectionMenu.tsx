import style from '../../css/components/CollectionMenu.module.css';

interface CollectionMenuProps {
    shown: boolean,
    setShown: Function;
}

function CollectionMenu( { shown, setShown } : CollectionMenuProps){

    function hideCollectionPopup(){
        setShown(false);
    }

    return(
        <div className={style.popup_backdrop  + (shown ? 'shown' : '')}>
            <div className={style.popup}>
                <button onClick={hideCollectionPopup}>Close</button>
                <h2>popup</h2>
                <input type='checkbox'></input>
                <label>Collection 1</label>
            </div>
        </div>
    )
}

export default CollectionMenu;