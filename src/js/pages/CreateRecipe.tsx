import style from '../../css/pages/CreateRecipe.module.css';

function CreateRecipe(){
    return(
        <div>
            <label htmlFor={style.image_upload}>Select an image for the recipe</label>
            <input id={style.image_upload} name='image_upload' type='file' accept="image/png, image/jpeg" />
            <label htmlFor={style.title}>Recipe title</label>
            <input id={style.title} type='text' />
            {/*TODO ingredients*/}
            <label htmlFor={style.instructions}>Instructions for the recipe</label>
            <textarea id={style.instructions} name="instructions" />
            {/*TODO tags*/}
        </div>
    )
}

export default CreateRecipe;