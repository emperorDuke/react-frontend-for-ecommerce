import React from 'react';
import './CustomAlert.css';
import { Alert, Button } from 'reactstrap';
import DeleteStatus from './DeleteStatus';

interface Props {
    handleCancelClick:() => void,
    handleDeleteClick:() => void,
    showDefault:boolean,
    isSucessful:boolean
}


const CustomAlert = ({handleCancelClick, handleDeleteClick, showDefault, isSucessful}: Props) => {

    const sucessInput = {status: 'success', src: 'link to a success png', alt: 'successPng', headings: 'Deleted Sucessfully'},
        
        failureInput = {status: 'danger', src: 'link to failure png', alt: 'dangerPng', headings: 'Could not Delete'},
        
        alert = showDefault ? <Alert color='warning'>
                                            <h4>Are you sure ?</h4>
                                            <Button color='warning' onClick={() => handleDeleteClick()}>Yes</Button>
                                            <Button onClick={() => handleCancelClick()}>Cancel</Button>
                                        </Alert> : 
                                        isSucessful ? <DeleteStatus {...sucessInput}/> : <DeleteStatus {...failureInput}/>; 
    return(
        <>
            {alert}
        </>
    );
}


export default CustomAlert;