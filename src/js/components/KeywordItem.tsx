import style from '../../css/components/KeywordItem.module.css'
import { Recipe } from '../interfaces/Recipe';
import { Keyword } from '../interfaces/Keyword';
import { useEffect, useContext, useRef } from 'react';
import { ThemeContext } from '../context/ThemeContext';

interface KeywordItemProps {
    index: number
    editing: boolean
    keyword: Keyword
    setRecipe: Function
}

function KeywordItem({ index, editing, keyword, setRecipe }: KeywordItemProps) {
    const theme = useContext(ThemeContext);

    const InputRef = useRef<HTMLInputElement>(null);

    //adjust width of the input elements to mimick behavior of p elements
    useEffect(() => {
        if (InputRef.current) {
            InputRef.current.style.width = (keyword.keyword_name.length + 1) + 'ch';
        }
    }, [keyword.keyword_name]);

    function handleKeywordInput(event: React.FormEvent<HTMLInputElement>) {
        const { value } = event.currentTarget;
        setRecipe((oldRecipe : Recipe) => {
            const updatedKeyword = {...keyword, keyword_name : value}
            const updatedKeywords = [...oldRecipe.keywords];
            //using the index to update, because name might not be unique
            updatedKeywords[index] = updatedKeyword;
            return { ...oldRecipe, keywords: updatedKeywords };
        })
    }

    function handleRemoveKeyword(){
        setRecipe((oldRecipe : Recipe) => {
            const updatedKeywords = [...oldRecipe.keywords];
            //using the index to splice, because name might not be unique
            updatedKeywords.splice(index, 1)
            return {...oldRecipe, keywords: updatedKeywords};
        });
    }

    return (
        <div className={style.keyword}>
            <input type="text" placeholder="keyword" value={keyword.keyword_name} onInput={handleKeywordInput} ref={InputRef}/>
            {editing && <button title="Delete keyword" onClick={handleRemoveKeyword}><img src={theme.deleteImage}></img></button>}
        </div>
    )
}

export default KeywordItem;