import React, { useRef, useState, useEffect } from "react";
import { SideBarProps } from "./@types";
import Link from "next/link";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListSubHeader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Popover from "@material-ui/core/Popover";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";

function SideBar(props: SideBarProps) {
  const [index, setIndex] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  const classes = useStyles({ height });
  const paperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paperRef.current) {
      setHeight(paperRef.current.clientHeight);
    }
  }, []);

  const handleOpen = (name: string) => () => {
    setAnchorEl(paperRef.current);
    setIndex(name);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIndex(null);
  };

  return (
    <Paper className={classes.root} ref={paperRef}>
      <div className={classes.navHeader} />
      <List aria-label="Product Category" dense disablePadding>
        {props.navItems.map(({ name, children }) => (
          <React.Fragment key={name}>
            <ListItem button onClick={handleOpen(name)}>
              <ListItemText
                primary={name}
                classes={{
                  primary: classes.fonts
                }}
              />
              <ChevronRight />
            </ListItem>
            <Popover
              PaperProps={{ className: classes.paper }}
              open={name === index && !!anchorEl}
              onClose={handleClose}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
            >
              <div className={classes.navHeader} />
              <Grid container>
                {children.map(child => (
                  <Grid item>
                    <List key={child.name} dense disablePadding>
                      <ListSubHeader disableSticky className={classes.fonts}>
                        <Link
                          href="/items/[slug]"
                          as={`/items/${child.name.split(" ").join("-")}?id=${
                            child.track_id
                          }`}
                        >
                          <a>{child.name}</a>
                        </Link>
                      </ListSubHeader>
                      {child.children.map(grandChild => (
                        <ListItem key={grandChild.name}>
                          <Link
                            href={{
                              pathname: `items/${grandChild.name
                                .split(" ")
                                .join("-")}`,
                              query: { id: grandChild.track_id }
                            }}
                          >
                            <a>
                              <ListItemText
                                primary={grandChild.name}
                                classes={{
                                  primary: classes.fonts
                                }}
                              />
                            </a>
                          </Link>
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                ))}
              </Grid>
            </Popover>
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}

export default React.memo(SideBar);
