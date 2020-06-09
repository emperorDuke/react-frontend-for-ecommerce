import React from 'react';
import CancelIcon from "@material-ui/icons/CancelOutlined";
import Button from '@material-ui/core/Button';
import Img from '../../Img';


export interface ImageTypes {
    imageUrls: Array<{
        key: number,
        imageUrl: string,
        title: string
    }>,
    deleteImage:(arg:number) => void,
}


const FormImageViewer =  ({deleteImage, imageUrls}:ImageTypes) => {
 
    const products = imageUrls.map((image, i) => (
        
        <div key={image.title + (i*5)}>
            <Img src={image.imageUrl} alt={image.title}/>
            <Button onClick={() => deleteImage(image.key)}>
                <CancelIcon />
                Remove
            </Button>
        </div>
    ));
    
    return(
        <>
            {products}
        </>
    );
}

export default FormImageViewer;


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////