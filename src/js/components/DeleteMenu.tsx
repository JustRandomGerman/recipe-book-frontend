import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { deleteRecipe } from '../../api';
import style from '../../css/components/DeleteMenu.module.css';

interface DeleteMenuProps{
    shown: boolean,
    setShown: Function,
    recipeId: number
}

function DeleteMenu({shown, setShown, recipeId} : DeleteMenuProps){
    const dialogRef = useRef<HTMLDialogElement>(null);
    
    useEffect( () => {
        if(shown){
            dialogRef.current?.showModal();
        }
        else{
            dialogRef.current?.close();
        }
    }, [shown])

    function handleCancel(){
        setShown(false);
    }

    const navigate = useNavigate();
    function handleDelete(){
        deleteRecipe(recipeId).then((response) => {
            navigate("/");
        })
    }
    
    return (
        <dialog className={style.delete_menu} ref={dialogRef}>
            <p>Are you sure you want to delete the recipe?</p>
            <button title="Delete the recipe" onClick={handleDelete}>Delete</button>
            <button title="Cancel" onClick={handleCancel}>Cancel</button>
        </dialog>
    )
}

export default DeleteMenu;