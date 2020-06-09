import React, { useState } from 'react';
import MenuNav from './CustomMenuBar';
import HomeIcon from "@material-ui/icons/HomeOutlined";
import AccountBox from "@material-ui/icons/AccountBox"
import Link from "next/link";

    
const MenuBarContainer = () => {

    const [isOpen_1, setIsOpenOne] = useState<any>(null);
    const [isOpen_2, setIsOpenTwo] = useState<any>(null);

    const menu = [   
        {
            glyph: <HomeIcon />,
            header: 'My Account',
            children: [
                {link: <Link href='/login'><a>login</a></Link>},
                {link: <Link href='store/sign-up'><a>Sign-up</a></Link>}
            ],
            anchorEl: isOpen_1,
            toggle: (e:React.ChangeEvent<{}>) => setIsOpenOne(e.currentTarget),
            handleClose: () => setIsOpenOne(null)
        },   
        {
            glyph: <AccountBox/>,
            header: 'Need help?',
            children: [
                {link: <Link href='/'><a>contact</a></Link>},
                {link: <Link href='/'><a>address</a></Link>},
                {divider: true}
            ],
            anchorEl: isOpen_2,
            toggle: (e:React.ChangeEvent<{}>) => setIsOpenTwo(e.currentTarget),
            handleClose: () => setIsOpenTwo(null)
            
        } 
    ]

    return (
        <>
            <MenuNav items={menu}/>     
        </>
    );
}

export default MenuBarContainer;