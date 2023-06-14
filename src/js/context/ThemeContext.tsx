import { createContext, useState, useEffect, ReactNode } from 'react';
import edit_image from '../../assets/pencil.svg';
import edit_image_white from '../../assets/pencil_white.svg';
import check_image from '../../assets/check2.svg';
import check_image_white from '../../assets/check2_white.svg';
import cancel_image from '../../assets/x.svg';
import cancel_image_white from '../../assets/x_white.svg';
import collection_image from '../../assets/collection.svg';
import collection_image_white from '../../assets/collection_white.svg';
import delete_image from '../../assets/trash.svg';
import delete_image_white from '../../assets/trash_white.svg';
import download_image from '../../assets/download.svg';
import download_image_white from '../../assets/download_white.svg';
import filter_image from '../../assets/funnel.svg';
import filter_image_white from '../../assets/funnel_white.svg';
import search_image from '../../assets/search.svg';
import search_image_white from '../../assets/search_white.svg';
import arrow_left from '../../assets/caret-left.svg';
import arrow_left_white from '../../assets/caret-left_white.svg';
import arrow_right from '../../assets/caret-right.svg';
import arrow_right_white from '../../assets/caret-right_white.svg';
import plus from '../../assets/plus-lg.svg';
import plus_white from '../../assets/plus-lg_white.svg';

export const ThemeContext = createContext({
    color: "light",
    deleteImage: delete_image,
    editImage: edit_image,
    checkImage: check_image,
    xImage: cancel_image,
    collectionImage: collection_image,
    downloadImage: download_image,
    filterImage: filter_image,
    searchImage: search_image,
    arrowLeftImage: arrow_left,
    arrowRightImage: arrow_right,
    plusImage: plus
});

interface ThemeProviderProps{
    children: ReactNode
}

export const ThemeProvider = ({children} : ThemeProviderProps) => {
    const [theme, setTheme] = useState({
        color: "light",
        deleteImage: delete_image,
        editImage: edit_image,
        checkImage: check_image,
        xImage: cancel_image,
        collectionImage: collection_image,
        downloadImage: download_image,
        filterImage: filter_image,
        searchImage: search_image,
        arrowLeftImage: arrow_left,
        arrowRightImage: arrow_right,
        plusImage: plus
    });

    //set the correct theme when loading
    useEffect( () => {
        const colorScheme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? "dark" : "light"
        setTheme({
            color: colorScheme,
            deleteImage: (colorScheme === "light" ? delete_image : delete_image_white),
            editImage: (colorScheme === "light" ? edit_image : edit_image_white),
            checkImage: (colorScheme === "light" ? check_image : check_image_white),
            xImage: (colorScheme === "light" ? cancel_image : cancel_image_white),
            collectionImage: (colorScheme === "light" ? collection_image : collection_image_white),
            downloadImage: (colorScheme === "light" ? download_image : download_image_white),
            filterImage: (colorScheme === "light" ? filter_image : filter_image_white),
            searchImage: (colorScheme === "light" ? search_image : search_image_white),
            arrowLeftImage: (colorScheme === "light" ? arrow_left : arrow_left_white),
            arrowRightImage: (colorScheme === "light" ? arrow_right : arrow_right_white),
            plusImage: (colorScheme === "light" ? plus : plus_white)
        });
    }, [])

    //set the correct theme when theme preference gets changed
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        let colorScheme;
        e.matches ? colorScheme = "dark" : colorScheme = "light";
        setTheme({
            color: colorScheme,
            deleteImage: (colorScheme === "light" ? delete_image : delete_image_white),
            editImage: (colorScheme === "light" ? edit_image : edit_image_white),
            checkImage: (colorScheme === "light" ? check_image : check_image_white),
            xImage: (colorScheme === "light" ? cancel_image : cancel_image_white),
            collectionImage: (colorScheme === "light" ? collection_image : collection_image_white),
            downloadImage: (colorScheme === "light" ? download_image : download_image_white),
            filterImage: (colorScheme === "light" ? filter_image : filter_image_white),
            searchImage: (colorScheme === "light" ? search_image : search_image_white),
            arrowLeftImage: (colorScheme === "light" ? arrow_left : arrow_left_white),
            arrowRightImage: (colorScheme === "light" ? arrow_right : arrow_right_white),
            plusImage: (colorScheme === "light" ? plus : plus_white)
        });
    })

    return(
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    )
}