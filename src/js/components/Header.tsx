import style from '../../css/components/Header.module.css';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function Header() {

    return (
      <header className={style.header}>
        <Link to='/'>
          <p>Recipe Book</p>
        </Link>
        <SearchBar />
        <Link to='create'>
          <p>Create new</p>
        </Link>
      </header>
    )
}

export default Header;