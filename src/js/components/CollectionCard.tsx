import style from '../../css/components/CollectionCard.module.css';
import { Link } from 'react-router-dom';
import { Collection } from '../interfaces/Collection';

interface CollectionCardProps{
    collection: Collection
    setShown: Function
}

function CollectionCard( { collection, setShown }: CollectionCardProps){
    
    function hideSidebar(){
        setShown(false);
    }

    return(
        <div className={style.collection_card}>
            <Link to={"/collection/" + collection.id} onClick={hideSidebar}>
                <div>
                    <h1>{collection.name}</h1>
                </div>
            </Link>
        </div>
    )
}

export default CollectionCard;