import style from '../../css/components/Sidebar.module.css';
import { Link } from 'react-router-dom';
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
                    <section id={style.create_button}>
                        <Link to='create'>
                            <button>Create new</button>
                        </Link>
                    </section>
                    <section>
                        <hr />
                        <h2>Collections</h2>
                        {collections?.map((collection: Collection) => <CollectionCard key={collection.id} collection={collection} />)}
                    </section>
                </div>
                <footer className={style.footer}>
                    <hr />
                    <a href='https://github.com/JustRandomGerman' target='_blank'>GitHub
                        <img src={theme.newTab} alt="Open in new Tab" />
                    </a>
                    <Link to='developer'>Developer Page</Link>
                    <Link to='swagger'>API Documentation</Link>
                    <p>&copy; Daniel Drescher. All rights reserved</p>
                </footer>
            </div>}
        </>
    )
}
  
export default Sidebar;