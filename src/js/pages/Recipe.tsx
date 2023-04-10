import { useState } from 'react';
import style from '../../css/pages/Recipe.module.css';
import image from '../../assets/marmorkuchen.jpg';
import CollectionMenu from '../components/CollectionMenu';

function Recipe(){

    let [collectionPopupShown, setCollectionPopupShown] = useState(false);
    let testtext = {"name": "Marmorkuchen","image": "marmorkuchen.jpg","ingredients":[{"amount":"250 g","name":"weiche Butter"},{"amount":"5","name":"Eier"},{"amount":"250 g","name":"Zucker"},{"amount":"1 TL","name":"Vanilleextrakt"},{"amount":"200 g","name":"Mehl (Typ 405)"},{"amount":"50 g","name":"Stärke"},{"amount":"5 g","name":"Backpulver"},{"amount":"30 g","name":"Kakaopulver"},{"amount":"1 Prise","name":"Salz"},{"amount":"125 ml","name":"Milch"}],"instructions":"Eine Kastenform mit Butter und Mehl einreiben. Den Ofen auf 170°C Ober-/Unterhitze vorheizen. Die Eier mit dem Salz steif schlagen und nach und nach 150 g von dem Zucker datzgeben bis der Eischnee weiche Spitzen hat. Die weiche Butter, die restlichen 100 g Zucker und das Vanilleextrakt cremig rühren. Beim Rühren die Eigelb nacheinander dazugeben und einen Schuss der Milch mit unterrühren. Den Eischnee vorsichtig unterheben. Mehl, Stärke und Backpulver zusammen in den Teig sieben und nach und nach unterrühren. Die Hälfte des Teigs in die Form geben. Das Kakaopulver mit Milch zu einer zähen Masse verrühren und in den restlichen Teig geben. Den Teig ebenfalls in die Form geben und marmorieren.<br><br>Im Ofen für 50-60 Minuten backen lassen und 5 Minuten in der Form auskühlen lassen.","tags":["snack","allyear","vegetarian"]};
    let grouptest = {"name": "Hähnchendöner","image": "döner.jpg","ingredients":{"groups":[{"groupname": "Fleisch", "members": [{"amount": "1 kg", "name": "ausgelöste Hähnchenoberkeulen"},{"amount": "1 Prise", "name": "Salz"},{"amount": "2 TL", "name": "Paprikapulver"},{"amount": "2 TL", "name": "Kreuzkümmel"},{"amount": "2", "name": "Knoblauchzehen"},{"amount": "1/2", "name": "Zwiebel"}]}, {"groupname": "Sauce", "members": [{"amount": "8 EL", "name": "Joghurt"},{"amount": "2 EL", "name": "Mayonnaise"},{"amount": "1 EL", "name": "getrockneter Rosmarin"},{"amount": "1 EL", "name": "getrockneter Oregano"},{"amount": "1-2", "name": "Knoblauchzehen"},{"amount": "1 EL", "name": "Zitronensaft"},{"amount": "1 Prise", "name": "Salz"}]},{"groupname": "Sonstiges", "members":[{"amount": "1", "name": "Fladenbrot"},{"amount":"1","name":"Zwiebel"},{"amount":"2","name":"Tomaten"},{"amount":"1/2","name":"Salatkopf"},{"amount":"1/4","name":"Rotkohl"},{"amount":"1/4","name":"Weißkohl"}]}]},"instructions":"Das Fleisch in Stücke schneiden und mit den Gewürzen vermischen. Die Zwiebel und den Knoblauch dazureiben und alles gut vermischen. Über Nacht im Kühlschrank marinieren lassen und am besten auf Spießen grillen.\n\nFür die Sauce alles in einer Schüssel vermischen und mit Salz abschmecken.","tags":["lunch","allyear"]};
    
    function showCollectionPopup(){
        setCollectionPopupShown(true);
    }

    return(
        <div className={style.recipe}>
            <CollectionMenu shown={collectionPopupShown} setShown={setCollectionPopupShown}/>
            <img src={image} alt="image of food"></img>
            <button>Edit</button>
            <button onClick={showCollectionPopup}>Add to collection</button>
            <h1>{testtext.name}</h1>
            <h2>Ingredients</h2>
            <article>
                <table>

                </table>
            </article>
            <h2>Instructions</h2>
            <article>
                <p>{testtext.instructions}</p>
            </article>
            <h2>Tags</h2>
            <article className={style.tags}>
                {testtext.tags.map(tag => {
                    return <p key={tag}>{tag}</p>
                })}
            </article>
        </div>
        
    )
}

export default Recipe;