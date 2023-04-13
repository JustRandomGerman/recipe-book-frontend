import style from '../../css/components/CollectionItem.module.css';

interface CollectionItemProps {
    name: string
}

function CollectionItem( {name} : CollectionItemProps){

    return(
        <li className={style.collection_item}>
            <input id={name} type='checkbox'></input>
            <label htmlFor={name}>{name}</label>
        </li>
    )
}

export default CollectionItem;