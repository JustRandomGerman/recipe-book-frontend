import style from '../../css/components/Header.module.css';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function Header() {
  const theme = useContext(ThemeContext);

    return (
      <header className={style.header}>
        <Link to='/'>
          <img id={style.logo} src={theme.logo} alt='Recipe Book'/>
        </Link>
        <SearchBar />
        <Link to='create'>
          <p>Create new</p>
        </Link>
      </header>
    )
}

export default Header;