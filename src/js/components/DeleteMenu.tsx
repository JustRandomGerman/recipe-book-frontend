import { useEffect, useRef } from "react";
import style from '../../css/components/DeleteMenu.module.css';

interface DeleteMenuProps{
    shown: boolean
    setShown: Function
    deletedObject: string
    deleteFunction: Function
}

function DeleteMenu({shown, setShown, deletedObject, deleteFunction}: DeleteMenuProps){
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

    function handleDelete(){
        deleteFunction();
        setShown(false);
    }
    
    return (
        <dialog className={style.delete_menu} ref={dialogRef}>
            <p>{`Are you sure you want to delete the ${deletedObject}`}</p>
            <button title={`Delete the ${deletedObject}`} onClick={handleDelete}>Delete</button>
            <button title="Cancel" onClick={handleCancel}>Cancel</button>
        </dialog>
    )
}

export default DeleteMenu;