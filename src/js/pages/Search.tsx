import { useSearchParams } from 'react-router-dom';
import style from '../../css/pages/Search.module.css';

function Search(){

    const [params, setParams] = useSearchParams();

    return(
        <div className={style.search}>
            <h2>{"Results for: \"" + params.get('query') + "\""}</h2>
        </div>
    )
}

export default Search;