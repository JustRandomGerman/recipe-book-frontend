import { useEffect, useState } from 'react';
import { getAPI } from '../../api';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import style from '../../css/pages/APIDocumentation.module.css';

function APIDocumentation() {
    const [apiDoc, setApiDoc] = useState<string>();

    useEffect( () => {
        getAPI().then((response) => {
            setApiDoc(response.data);
        })
    }, [])

    return (
        <div className={style.api_doc}>
            <SwaggerUI spec={apiDoc}/>
        </div>
    )
}

export default APIDocumentation;