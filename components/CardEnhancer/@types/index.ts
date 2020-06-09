
import React from 'react';


export type SizeTypes = 'md' | 'sm' | 'lg' ;

export interface CardEnhancerProps {
    size?: SizeTypes;
    disableToggler?: boolean;
    withAppBar?: boolean;
    appBarProps?: {
        text?: string;
        disableToggler?: boolean;
        link?: string;
    };
    children: React.ReactNodeArray;
    cardType?: 'list' | 'module'
}