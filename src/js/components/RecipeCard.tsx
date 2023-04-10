import style from '../../css/components/RecipeCard.module.css';
import { Link } from 'react-router-dom';
import image from '../../assets/marmorkuchen.jpg';

function RecipeCard(){

    let testtext = {"id": 1, "name": "Marmorkuchen","image": "marmorkuchen.jpg","ingredients":[{"amount":"250 g","name":"weiche Butter"},{"amount":"5","name":"Eier"},{"amount":"250 g","name":"Zucker"},{"amount":"1 TL","name":"Vanilleextrakt"},{"amount":"200 g","name":"Mehl (Typ 405)"},{"amount":"50 g","name":"Stärke"},{"amount":"5 g","name":"Backpulver"},{"amount":"30 g","name":"Kakaopulver"},{"amount":"1 Prise","name":"Salz"},{"amount":"125 ml","name":"Milch"}],"instructions":"Eine Kastenform mit Butter und Mehl einreiben. Den Ofen auf 170°C Ober-/Unterhitze vorheizen. Die Eier mit dem Salz steif schlagen und nach und nach 150 g von dem Zucker datzgeben bis der Eischnee weiche Spitzen hat. Die weiche Butter, die restlichen 100 g Zucker und das Vanilleextrakt cremig rühren. Beim Rühren die Eigelb nacheinander dazugeben und einen Schuss der Milch mit unterrühren. Den Eischnee vorsichtig unterheben. Mehl, Stärke und Backpulver zusammen in den Teig sieben und nach und nach unterrühren. Die Hälfte des Teigs in die Form geben. Das Kakaopulver mit Milch zu einer zähen Masse verrühren und in den restlichen Teig geben. Den Teig ebenfalls in die Form geben und marmorieren.<br><br>Im Ofen für 50-60 Minuten backen lassen und 5 Minuten in der Form auskühlen lassen.","tags":["snack","allyear","vegetarian"]};

    return(
        <div className={style.recipe_card}>
            <Link to={"/recipe/" + testtext.id}>
                <div>
                    <img src={image} alt='image'></img>
                    <h1>{testtext.name}</h1>
                </div>
            </Link>
        </div>
    )
}

export default RecipeCard;