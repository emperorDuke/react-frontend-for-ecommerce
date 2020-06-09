import React from 'react';


export interface NextLinkProps {
    href?: string;
    as?: string;
    prefetch?: boolean;
    replace?: boolean;
    className?: string;
    onClick?: (event:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}



export interface LinkProps extends NextLinkProps {
    naked?: boolean;
    innerRef?: React.Ref<HTMLAnchorElement>;
    activeClassName?: string;
    children: React.ReactNode;
}