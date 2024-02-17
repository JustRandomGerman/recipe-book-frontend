import { createContext, useState, useEffect, ReactNode } from 'react';
import logo_black from '../../assets/recipe-book-icon.svg';
import logo_yellow from '../../assets/recipe-book-icon-yellow.svg';
import edit_image from '../../assets/pencil.svg';
import edit_image_white from '../../assets/pencil-white.svg';
import check_image from '../../assets/check.svg';
import check_image_white from '../../assets/check-white.svg';
import cancel_image from '../../assets/close.svg';
import cancel_image_white from '../../assets/close-white.svg';
import collection_image from '../../assets/collection.svg';
import collection_image_white from '../../assets/collection-white.svg';
import delete_image from '../../assets/trash.svg';
import delete_image_white from '../../assets/trash-white.svg';
import download_image from '../../assets/download.svg';
import download_image_white from '../../assets/download-white.svg';
import filter_image from '../../assets/funnel.svg';
import filter_image_white from '../../assets/funnel-white.svg';
import search_image from '../../assets/search.svg';
import search_image_white from '../../assets/search-white.svg';
import arrow_left_image from '../../assets/caret-left.svg';
import arrow_left_image_white from '../../assets/caret-left-white.svg';
import arrow_right_image from '../../assets/caret-right.svg';
import arrow_right_image_white from '../../assets/caret-right-white.svg';
import arrow_down_image from '../../assets/caret-down.svg';
import arrow_down_image_white from '../../assets/caret-down-white.svg';
import arrow_up_image from '../../assets/caret-up.svg';
import arrow_up_image_white from '../../assets/caret-up-white.svg';
import plus_image from '../../assets/plus.svg';
import plus_image_white from '../../assets/plus-white.svg';
import hamburger_menu_image from '../../assets/hamburger-menu.svg';
import hamburger_menu_image_white from '../../assets/hamburger-menu-white.svg';
import save_image from '../../assets/save.svg';
import save_image_white from '../../assets/save-white.svg';
import new_tab_image from '../../assets/new-tab.svg';
import new_tab_image_white from '../../assets/new-tab-white.svg';

export const ThemeContext = createContext({
    color: "light",
    logo: logo_black,
    deleteImage: delete_image,
    editImage: edit_image,
    checkImage: check_image,
    xImage: cancel_image,
    collectionImage: collection_image,
    downloadImage: download_image,
    filterImage: filter_image,
    searchImage: search_image,
    arrowLeftImage: arrow_left_image,
    arrowRightImage: arrow_right_image,
    arrowDownImage: arrow_down_image,
    arrowUpImage: arrow_up_image,
    plusImage: plus_image,
    hamburgerMenuImage: hamburger_menu_image,
    saveImage: save_image,
    newTab: new_tab_image
});

interface ThemeProviderProps{
    children: ReactNode
}

export const ThemeProvider = ({children}: ThemeProviderProps) => {
    const [theme, setTheme] = useState({
        color: "light",
        logo: logo_black,
        deleteImage: delete_image,
        editImage: edit_image,
        checkImage: check_image,
        xImage: cancel_image,
        collectionImage: collection_image,
        downloadImage: download_image,
        filterImage: filter_image,
        searchImage: search_image,
        arrowLeftImage: arrow_left_image,
        arrowRightImage: arrow_right_image,
        arrowDownImage: arrow_down_image,
        arrowUpImage: arrow_up_image,
        plusImage: plus_image,
        hamburgerMenuImage: hamburger_menu_image,
        saveImage: save_image,
        newTab: new_tab_image
    });

    //set the correct theme when loading
    useEffect( () => {
        const colorScheme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? "dark" : "light"
        setTheme({
            color: colorScheme,
            logo: (colorScheme === "light" ? logo_black : logo_yellow),
            deleteImage: (colorScheme === "light" ? delete_image : delete_image_white),
            editImage: (colorScheme === "light" ? edit_image : edit_image_white),
            checkImage: (colorScheme === "light" ? check_image : check_image_white),
            xImage: (colorScheme === "light" ? cancel_image : cancel_image_white),
            collectionImage: (colorScheme === "light" ? collection_image : collection_image_white),
            downloadImage: (colorScheme === "light" ? download_image : download_image_white),
            filterImage: (colorScheme === "light" ? filter_image : filter_image_white),
            searchImage: (colorScheme === "light" ? search_image : search_image_white),
            arrowLeftImage: (colorScheme === "light" ? arrow_left_image : arrow_left_image_white),
            arrowRightImage: (colorScheme === "light" ? arrow_right_image : arrow_right_image_white),
            arrowDownImage: (colorScheme === "light" ? arrow_down_image : arrow_down_image_white),
            arrowUpImage: (colorScheme === "light" ? arrow_up_image : arrow_up_image_white),
            plusImage: (colorScheme === "light" ? plus_image : plus_image_white),
            hamburgerMenuImage: (colorScheme === "light" ? hamburger_menu_image : hamburger_menu_image_white),
            saveImage: (colorScheme === "light" ? save_image : save_image_white),
            newTab: (colorScheme === "light" ? new_tab_image : new_tab_image_white)
        });
    }, [])

    //set the correct theme when theme preference gets changed
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        let colorScheme;
        e.matches ? colorScheme = "dark" : colorScheme = "light";
        setTheme({
            color: colorScheme,
            logo: (colorScheme === "light" ? logo_black : logo_yellow),
            deleteImage: (colorScheme === "light" ? delete_image : delete_image_white),
            editImage: (colorScheme === "light" ? edit_image : edit_image_white),
            checkImage: (colorScheme === "light" ? check_image : check_image_white),
            xImage: (colorScheme === "light" ? cancel_image : cancel_image_white),
            collectionImage: (colorScheme === "light" ? collection_image : collection_image_white),
            downloadImage: (colorScheme === "light" ? download_image : download_image_white),
            filterImage: (colorScheme === "light" ? filter_image : filter_image_white),
            searchImage: (colorScheme === "light" ? search_image : search_image_white),
            arrowLeftImage: (colorScheme === "light" ? arrow_left_image : arrow_left_image_white),
            arrowRightImage: (colorScheme === "light" ? arrow_right_image : arrow_right_image_white),
            arrowDownImage: (colorScheme === "light" ? arrow_down_image : arrow_down_image_white),
            arrowUpImage: (colorScheme === "light" ? arrow_up_image : arrow_up_image_white),
            plusImage: (colorScheme === "light" ? plus_image : plus_image_white),
            hamburgerMenuImage: (colorScheme === "light" ? hamburger_menu_image : hamburger_menu_image_white),
            saveImage: (colorScheme === "light" ? save_image : save_image_white),
            newTab: (colorScheme === "light" ? new_tab_image : new_tab_image_white)
        });
    })

    return(
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    )
}