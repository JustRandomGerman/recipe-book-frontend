import style from '../../css/components/Header.module.css';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

interface HeaderProps{
  setSidebarShown: Function
}

function Header( {setSidebarShown}: HeaderProps ) {
    const theme = useContext(ThemeContext);

    function handleToggleSidebar(){
      setSidebarShown( (sidebarShown: boolean) => {
        return !sidebarShown;
      })
    }

    return (
      <header className={style.header}>
        <div id={style.left_part}>
          <button onClick={handleToggleSidebar}>
            <img src={theme.hamburgerMenuImage} />
          </button>
          <Link to='/'>
            <img id={style.logo} src={theme.logo} alt='Recipe Book'/>
          </Link>
        </div>
        <SearchBar setSidebarShown={setSidebarShown} />
        <div>{/* This is for having everything in the correct place */}</div>
      </header>
    )
}

export default Header;