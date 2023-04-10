import { useParams } from 'react-router-dom';
import style from '../../css/pages/Search.module.css';

function Search(){

    const params = useParams();

    return(
        <div className={style.search}>
            <h2>{"Results for: \"" + params.query + "\""}</h2>
        </div>
    )
}

export default Search;