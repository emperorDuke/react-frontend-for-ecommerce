import * as React from 'react';
import { Alert} from 'reactstrap';

interface Props {
    status:string,
    alt:string,
    src:string,
    headings:string
}


const DeleteStatus = (props: Props) => {
    return(
        <Alert color={props.status}>
            <img src={props.src} alt={props.alt} className='alert-image'/>
            <h4>{props.headings}</h4>
        </Alert>
    );
}

export default DeleteStatus;