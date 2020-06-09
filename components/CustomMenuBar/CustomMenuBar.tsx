import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = (theme:Theme) => createStyles({
    root:{
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(5),
        marginRight: theme.spacing(1)
    },
    btn:{
        fontSize: theme.typography.fontSize
    }
});


interface Link {
    link?: JSX.Element,
    divider?: boolean
}

interface MenuItem {
    glyph: JSX.Element,
    header: string,
    anchorEl: any,
    toggle:(e:React.ChangeEvent<{}>) => void,
    children: Array<Link>;
    handleClose:() => void;
}

interface Props extends WithStyles<typeof styles> {
    items: Array<MenuItem>
}


const MenusBars = ({items, classes} :Props) => { 

    const menu = items.map((menuItem, i) =>
        <React.Fragment key={menuItem.header + i}>
            <Button
                aria-owns={menuItem.anchorEl ? 'menu-list-grow' : undefined}
                aria-haspopup='true'
                onClick={menuItem.toggle}
                className={classes.btn}
            >
                {menuItem.glyph}
                {menuItem.header}
            </Button>      
            <Menu
                id='menu-list-grow'
                anchorEl={menuItem.anchorEl}
                open={menuItem.anchorEl ? true: false}
                onClose={menuItem.handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                >
                {
                    menuItem.children.map((subMenuItem, i) => {
                        return(
                            subMenuItem.link ?
                            <MenuItem key={i}>{subMenuItem.link}</MenuItem> :
                            subMenuItem.divider ?
                            <Divider key={i}/> : null
                        )
                    })
                }
            </Menu>  
        </React.Fragment>
    )

    return ( 
        <>
            {menu}
        </>
    );
}


export default withStyles(styles)(MenusBars);