import style from '../../css/components/Sidebar.module.css';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Collection } from '../interfaces/Collection';
import { getCollections } from '../../api';
import CollectionCard from './CollectionCard';

interface SidebarProps{
    shown: boolean
}

function Sidebar( {shown}: SidebarProps) {
    const theme = useContext(ThemeContext);  
  
    const [collections, setCollections] = useState<Collection[]>();

    useEffect( () => {
        getCollections().then((response) => {
            setCollections(response);
        })
    }, [])

    return (
        <>
            {shown && <div className={style.sidebar}>
                <div>
                    <hr id={style.top_rule}/>
                    <h2>Collections</h2>
                    {collections?.map((collection: Collection) => <CollectionCard key={collection.id} collection={collection} />)}
                </div>
                <footer className={style.footer}>
                    <hr />
                    &copy; Daniel Drescher. All rights reserved
                </footer>
            </div>}
        </>
    )
}
  
export default Sidebar;