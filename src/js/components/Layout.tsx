import style from '../../css/components/Layout.module.css';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {

    return (
      <div id={style.layout}>
        <div id={style.upper_layout}>
          <Header />
          <Outlet />
        </div>
        <Footer />
      </div>
    )
}

export default Layout;