import style from '../../css/components/RecipeKeywords.module.css';
import { Recipe } from '../interfaces/Recipe';
import { Keyword } from '../interfaces/Keyword';
import KeywordItem from './KeywordItem';
import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';

interface RecipeKeywordsProps {
    editing: boolean,
    keywords: Keyword[],
    setRecipe: Function
}

function RecipeKeywords({ editing, keywords, setRecipe }: RecipeKeywordsProps) {
    const theme = useContext(ThemeContext);

    function handleAddKeyword() {
        setRecipe((oldRecipe: Recipe) => {
            const updatedKeywords = [...oldRecipe.keywords, { keyword_name: "" }];
            return { ...oldRecipe, keywords: updatedKeywords };
        });
    }

    return (
        <section>
            <h2>Keywords</h2>
            <p>🛈 Keywords are used when searching for recipes. The name does not have to be duplicated</p>
            <div className={style.keyword_container}>
                {keywords.map((keyword: Keyword, index: number) => <KeywordItem key={`${index}_${keyword}`} index={index} editing={editing} keyword={keyword} setRecipe={setRecipe} />)}
                <button title="Add a new keyword" onClick={handleAddKeyword}>
                    <img src={theme.plusImage} alt="Delete"></img>
                </button>
            </div>
        </section>
    )
}

export default RecipeKeywords;