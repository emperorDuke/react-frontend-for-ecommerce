import React, { memo } from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "../Link";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import Container from "@material-ui/core/Container";
import { items } from "./data";


const Footer: React.ComponentType = memo(() => {
  const classes = useStyles();

  const lists = items.map((item) => {
    return (
      <Grid item xs={3} key={item.header}>
        <Typography variant="h6" gutterBottom className={classes.header}>
          {item.header}
        </Typography>
        <List>
          {item.lists.map((list, i) => {
            return (
              <ListItem key={i}>
                <Link href={list.link} className={classes.link}>
                  {list.item}
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
      <Container maxWidth="lg">
        <Grid container spacing={8} justify="space-evenly">
          {lists}
        </Grid>
      </Container>
    </footer>
  );
});

export default Footer;
