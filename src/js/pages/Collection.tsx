import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import style from '../../css/pages/Collection.module.css';
import { Collection } from '../interfaces/Collection';
import { getCollection, updateCollection, deleteCollection } from '../../api';
import RecipeCard from '../components/RecipeCard';
import { ThemeContext } from '../context/ThemeContext';

function Collection() {
    const theme = useContext(ThemeContext);

    const [collection, setCollection] = useState<Collection>();
    const [originalCollection, setOriginalCollection] = useState<Collection>();
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [editing, setEditing] = useState<boolean>(false);

    const params = useParams();
    const id: number = Number(params.id);

    useEffect( () => {
        getCollection(id).then((response) => {
            setCollection(response);
            setOriginalCollection(response);
            setLoading(false);
        }).catch((error) => {
            setLoadingError(error);
            setLoading(false);
        })
    }, [])

    function handleInput(event: React.FormEvent<HTMLInputElement>){
        const value = event.currentTarget.value;
        setCollection((oldCollection: Collection | undefined) => {
            if (!oldCollection) {
              return oldCollection;
            }
            return {
              ...oldCollection,
              name: value
            };
        });
    }

    function handleSaveCollection(){
        //remove error from previous attempt
        setError("");
        setEditing(false);
        updateCollection(id, collection!).then((response) => {
            setSuccess("Successfully saved collection");
            //set original recipe to the new one after saving
            setOriginalCollection(collection);
            //hide success message after some time
            setTimeout(() => {
                setSuccess("");
            }, 5000)
        }).catch((error) => {
            setError(error);
        })
    }

    function handleCancel(){
        setEditing(false);
        setCollection(originalCollection);
    }

    function handleEdit(){
        setEditing(true);
    }

    const navigate = useNavigate();
    function handleDeleteCollectionButton(){
        deleteCollection(id).then((response) => {
            navigate("/");
        })
    }

    return (
        <div className={style.collection}>
            {!loading && loadingError === "" ? (
                <>
                    <p className='error'>{error}</p>
                    <p className='success'>{success}</p>
                    <section className={style.control_buttons}>
                        {editing && <button title="Save the collection" onClick={handleSaveCollection}>
                            <img src={theme.checkImage} alt={"Save"}/>
                        </button>}
                        {editing && <button title="Cancel editing" onClick={handleCancel}>
                            <img src={theme.xImage} alt='cancel' />
                        </button>}
                        {!editing && <button title="Edit collection" onClick={handleEdit}>
                            <img src={theme.editImage} alt={"Edit"}/>
                        </button>}
                        {!editing && <button title="Delete collection" onClick={handleDeleteCollectionButton}>
                            <img src={theme.deleteImage} alt='Delete'/>
                        </button>}
                    </section>
                    <input className={style.collection_heading} type="text" value={collection?.name} onInput={handleInput} disabled={!editing} />
                    <h2>Recipes in this collection:</h2>
                    <section className={style.container}>
                        {collection!.recipes!.map((recipe) => <RecipeCard key={`recent_${recipe.id}_${recipe.name}`} recipe={recipe} />)}
                    </section>
                </>
            ) : (
                <>
                    {loading && <p className="loading">loading...</p>}
                    <p className='error'>{loadingError}</p>
                </>
            )}
            
        </div>
    )
}

export default Collection;