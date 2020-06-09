import React from "react";



export interface ImageField {
    key: number;
    type: string;
    id?: string;
    className?: string;
    ref: React.RefObject<any>;
    field?: string;
    label?: string;
}

export interface InputElementForImageProps {
    imageFields: Array<ImageField>;
    addField?: () => void;
    removeField?: (arg: number) => void;
}