import '../../css/components/Header.css';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'

function Header() {

    return (
      <div className='header'>
        <Link to='/'>
          <p>Recipe Book</p>
        </Link>
        <SearchBar />
        <Link to='create'>
          <p>Create new</p>
        </Link>
      </div>
    )
}

export default Header;