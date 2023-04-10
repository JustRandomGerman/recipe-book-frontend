import style from '../../css/pages/NotFound.module.css';

function NotFound() {

    return (
      <div className={style.not_found}>
        <h1>Error 404</h1>
        <p>Ressource not found</p>
      </div>
    )
}
  
export default NotFound;