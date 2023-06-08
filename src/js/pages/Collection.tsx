import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import style from '../../css/pages/Collection.module.css';
import { Collection } from '../interfaces/Collection';
import { getCollection, updateCollection, deleteCollection } from '../../api';
import RecipeCard from '../components/RecipeCard';
import { ThemeContext } from '../context/ThemeContext';

function Collection() {
    const theme = useContext(ThemeContext);

    let [collection, setCollection] = useState<Collection>();
    let [originalCollection, setOriginalCollection] = useState<Collection>();
    let [loading, setLoading] = useState<boolean>(true);
    let [loadingError, setLoadingError] = useState<string>("");
    let [error, setError] = useState<string>("");
    let [success, setSuccess] = useState<string>("");
    let [editing, setEditing] = useState<boolean>(false);

    const params = useParams();
    const id : number = Number(params.id);

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

    function handleInput(event : React.FormEvent<HTMLInputElement>){
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

    function saveCollection(){
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

    function cancel(){
        setEditing(false);
        setCollection(originalCollection);
    }

    function edit(){
        setEditing(true);
    }

    const navigate = useNavigate();
    function deleteCollectionButton(){
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
                        {editing && <button title="Save the collection" onClick={saveCollection}>
                            <img src={theme.checkImage} alt={"Save"}/>
                        </button>}
                        {editing && <button title="Cancel editing" onClick={cancel}>
                            <img src={theme.xImage} alt='cancel' />
                        </button>}
                        {!editing && <button title="Edit collection" onClick={edit}>
                            <img src={theme.editImage} alt={"Edit"}/>
                        </button>}
                        {!editing && <button title="Delete collection" onClick={deleteCollectionButton}>
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