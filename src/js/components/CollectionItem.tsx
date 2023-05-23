import { addRecipeToCollection, removeRecipeFromCollection } from '../../api';
import style from '../../css/components/CollectionItem.module.css';
import { Collection } from '../interfaces/Collection';
import { Recipe } from '../interfaces/Recipe';

interface CollectionItemProps {
    collection : Collection
    recipeId : number
    recipeCollections : Collection[]
    setRecipe: Function
}

function CollectionItem( {collection, recipeId, recipeCollections, setRecipe} : CollectionItemProps){

    function handleSelectChange(event : React.ChangeEvent<HTMLInputElement>){
        if(event.target.checked === true){
            addRecipeToCollection(collection.id, recipeId).then((response) => {
                setRecipe((oldRecipe : Recipe) => ({
                    ...oldRecipe,
                    collections: [...oldRecipe.collections, response]
                }))
            })
        }
        else{
            removeRecipeFromCollection(collection.id, recipeId).then((response) => {
                setRecipe((oldRecipe : Recipe) => {
                    const updatedCollections = oldRecipe.collections.filter((c : Collection) => c.id !== collection.id);
                    return {...oldRecipe, collections: updatedCollections};
                });
            })
        }
    }

    return(
        <li className={style.collection_item}>
            <input id={collection.name} type='checkbox' checked={recipeCollections.some((coll) => coll.name === collection.name)} onChange={handleSelectChange}></input>
            <label htmlFor={collection.name}>{collection.name}</label>
        </li>
    )
}

export default CollectionItem;