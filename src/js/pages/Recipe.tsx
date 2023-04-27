import { useState } from 'react';
import style from '../../css/pages/Recipe.module.css';
import image from '../../assets/marmorkuchen.jpg';
import CollectionMenu from '../components/CollectionMenu';
import IngredientList from '../components/IngredientList';
import TagList from '../components/TagList';
import edit_image from '../../assets/pencil.svg'
import check_image from '../../assets/check2.svg'
import collection_image from '../../assets/collection.svg'
import delete_image from '../../assets/trash.svg'
import download_image from '../../assets/download.svg'

function Recipe(){
    let [collectionPopupShown, setCollectionPopupShown] = useState<boolean>(false);
    let [editing, setEditing] = useState<boolean>(false);
    let testtext = {"name": "Marmorkuchen","image": "marmorkuchen.jpg","ingredients":[{"amount":"250 g","name":"weiche Butter"},{"amount":"5","name":"Eier"},{"amount":"250 g","name":"Zucker"},{"amount":"1 TL","name":"Vanilleextrakt"},{"amount":"200 g","name":"Mehl (Typ 405)"},{"amount":"50 g","name":"Stärke"},{"amount":"5 g","name":"Backpulver"},{"amount":"30 g","name":"Kakaopulver"},{"amount":"1 Prise","name":"Salz"},{"amount":"125 ml","name":"Milch"}],"instructions":"Eine Kastenform mit Butter und Mehl einreiben. Den Ofen auf 170°C Ober-/Unterhitze vorheizen. Die Eier mit dem Salz steif schlagen und nach und nach 150 g von dem Zucker datzgeben bis der Eischnee weiche Spitzen hat. Die weiche Butter, die restlichen 100 g Zucker und das Vanilleextrakt cremig rühren. Beim Rühren die Eigelb nacheinander dazugeben und einen Schuss der Milch mit unterrühren. Den Eischnee vorsichtig unterheben. Mehl, Stärke und Backpulver zusammen in den Teig sieben und nach und nach unterrühren. Die Hälfte des Teigs in die Form geben. Das Kakaopulver mit Milch zu einer zähen Masse verrühren und in den restlichen Teig geben. Den Teig ebenfalls in die Form geben und marmorieren.\n\nIm Ofen für 50-60 Minuten backen lassen und 5 Minuten in der Form auskühlen lassen.","tags":[{name: "snack"},{name:"allyear"},{name: "vegetarian"}]};
    let grouptest = {"name": "Hähnchendöner","image": "döner.jpg","ingredients":{"groups":[{"groupname": "Fleisch", "members": [{"amount": "1 kg", "name": "ausgelöste Hähnchenoberkeulen"},{"amount": "1 Prise", "name": "Salz"},{"amount": "2 TL", "name": "Paprikapulver"},{"amount": "2 TL", "name": "Kreuzkümmel"},{"amount": "2", "name": "Knoblauchzehen"},{"amount": "1/2", "name": "Zwiebel"}]}, {"groupname": "Sauce", "members": [{"amount": "8 EL", "name": "Joghurt"},{"amount": "2 EL", "name": "Mayonnaise"},{"amount": "1 EL", "name": "getrockneter Rosmarin"},{"amount": "1 EL", "name": "getrockneter Oregano"},{"amount": "1-2", "name": "Knoblauchzehen"},{"amount": "1 EL", "name": "Zitronensaft"},{"amount": "1 Prise", "name": "Salz"}]},{"groupname": "Sonstiges", "members":[{"amount": "1", "name": "Fladenbrot"},{"amount":"1","name":"Zwiebel"},{"amount":"2","name":"Tomaten"},{"amount":"1/2","name":"Salatkopf"},{"amount":"1/4","name":"Rotkohl"},{"amount":"1/4","name":"Weißkohl"}]}]},"instructions":"Das Fleisch in Stücke schneiden und mit den Gewürzen vermischen. Die Zwiebel und den Knoblauch dazureiben und alles gut vermischen. Über Nacht im Kühlschrank marinieren lassen und am besten auf Spießen grillen.\n\nFür die Sauce alles in einer Schüssel vermischen und mit Salz abschmecken.","tags":["lunch","allyear"]};
    
    function showCollectionPopup(){
        setCollectionPopupShown(true);
    }

    function edit(){
        setEditing(true);
    }

    function save(){
        setEditing(false);
        //TODO send PUT request to server
    }

    function deleteRecipe(){
        //TODO send DELETE request to server
    }

    function savePdf(){
        //TODO
    }

    return(
        <div className={style.recipe}>
            <CollectionMenu shown={collectionPopupShown} setShown={setCollectionPopupShown}/>
            <img src={image} alt="image of food"></img>
            <section className={style.control_buttons}>
                <button onClick={editing ? save : edit}>
                    <img src={!editing ? edit_image : check_image} alt={!editing ? 'Edit' : 'Save'}/>
                </button>
                {!editing ? <button onClick={showCollectionPopup}>
                    <img src={collection_image} alt='Add to collection'/>
                </button> : <></>}
                {!editing ? <button onClick={deleteRecipe}>
                    <img src={delete_image} alt='Delete'/>
                </button> : <></>}
                {!editing ? <button onClick={savePdf}>
                    <img src={download_image} alt='Download'/>
                </button> : <></>}
            </section>
            <h1 contentEditable={editing}>{testtext.name}</h1>
            <IngredientList editing={editing} ingredients={testtext.ingredients}/>
            <section>
                <h2>Instructions</h2>
                <p contentEditable={editing}>{testtext.instructions}</p>
            </section>
            <TagList editing={editing} tags={testtext.tags} />
        </div>
        
    )
}

export default Recipe;