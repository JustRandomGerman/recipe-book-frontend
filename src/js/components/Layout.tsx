import style from '../../css/components/Layout.module.css';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useState } from 'react';

interface LayoutProps{
  sidebarShown: boolean
  setSidebarShown: Function
}

function Layout( {sidebarShown, setSidebarShown} : LayoutProps) {

    return (
      <div id={style.layout}>
        <Header setSidebarShown={setSidebarShown} />
        <Sidebar shown={sidebarShown} setShown={setSidebarShown} />
        <Outlet />
      </div>
    )
}

export default Layout;