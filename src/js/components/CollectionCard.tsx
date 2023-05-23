import style from '../../css/components/CollectionCard.module.css';
import { Link } from 'react-router-dom';
import { Collection } from '../interfaces/Collection';

interface CollectionCardProps{
    collection: Collection
}

function CollectionCard( { collection } : CollectionCardProps){
    

    return(
        <div className={style.collection_card}>
            <Link to={"/collection/" + collection.id}>
                <div>
                    <h1>{collection.name}</h1>
                </div>
            </Link>
        </div>
    )
}

export default CollectionCard;