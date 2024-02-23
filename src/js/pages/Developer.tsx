import style from '../../css/pages/Developer.module.css';
function Developer() {

    return (
        <div className={style.developer}> 
            <h1>Developer Page</h1>
            <a href='http://localhost:3000/developer/export' target='_blank'>Export all recipes</a>
        </div>
    )
}
  
export default Developer;