import style from '../../css/components/Layout.module.css';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useState } from 'react';

function Layout() {

    const [sidebarShown, setSidebarShown] = useState<boolean>(false);

    return (
      <div id={style.layout}>
        <Header setSidebarShown={setSidebarShown} />
        <Sidebar shown={sidebarShown} />
        <Outlet />
      </div>
    )
}

export default Layout;