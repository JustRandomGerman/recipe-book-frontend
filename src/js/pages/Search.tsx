import { useParams } from 'react-router-dom';
import '../../css/pages/Search.css'

function Search(){

    const params = useParams();

    return(
        <div className='search_page'>
            <h2>{"Results for: \"" + params.query + "\""}</h2>
        </div>
    )
}

export default Search;