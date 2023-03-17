import '../../css/components/Layout.css';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {

    return (
      <div id='layout'>
        <div>
          <Header />
          <Outlet />
        </div>
        <Footer />
      </div>
    )
}

export default Layout;