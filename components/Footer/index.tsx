import React, { memo } from "react";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import Toolbar from "@material-ui/core/Toolbar";

const items = [
  {
    header: "Contact",
    lists: [
      { item: "07037606116", link: "/" },
      { item: "Blockhousing calabar", link: "/" },
      { item: "i ma here", link: "/" }
    ]
  },
  {
    header: "Features",
    lists: [
      { item: "Cool stuff", link: "/" },
      { item: "Random feature", link: "/" },
      { item: "Team Features", link: "/" },
      { item: "Developer stuff", link: "/" },
      { item: "Another stuff", link: "/" }
    ]
  },
  {
    header: "Resources",
    lists: [
      { item: "First Resource", link: "/" },
      { item: "Second Resource", link: "/" },
      { item: "Third Resource", link: "/" },
      { item: "Fourth Resource", link: "/" },
      { item: "Fifth Resource", link: "/" }
    ]
  },
  {
    header: "Legals",
    lists: [
      { item: "Legal one", link: "/" },
      { item: "Legal two", link: "/" },
      { item: "Legal three", link: "/" },
      { item: "Legal four", link: "/" },
      { item: "Legal five", link: "/" }
    ]
  }
];

const Footer: React.ComponentType = memo(() => {
  const classes = useStyles();

  const lists = items.map(item => {
    return (
      <Grid item sm={3} xs key={item.header}>
        <Typography variant="h4" gutterBottom>
          {item.header}
        </Typography>
        <List>
          {item.lists.map((list, i) => {
            return (
              <ListItem key={i}>
                <Link href={list.link}>
                  <a>{list.item}</a>
                </Link>
              </ListItem>
            );
          })}
        </List>
      </Grid>
    );
  });

  return (
    <footer className={classes.root}>
      <Toolbar>
        <Grid container spacing={8} justify="space-evenly">
          {lists}
        </Grid>
      </Toolbar>
    </footer>
  );
});

export default Footer;
