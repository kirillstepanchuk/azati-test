import React from "react";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import TranslateIcon from "@mui/icons-material/Translate";
import { Link } from "react-router-dom";

import { ROUTE_PAGES } from "../../constants";

const useStyles = makeStyles((theme) =>
  createStyles({
    logo: {
      color: theme.palette.secondary.light,
    },
    linkText: {
      color: theme.palette.secondary.light,
    },
    link: {
      textDecoration: "none",
      marginRight: theme.spacing(2),
    },
  })
);

const Header = () => {
  const classes = useStyles();

  return (
    <Grid container direction="row" alignItems="center">
      <AppBar position="relative">
        <Toolbar>
          <Link className={classes.link} to={ROUTE_PAGES.main}>
            <IconButton>
              <TranslateIcon className={classes.logo} />
            </IconButton>
          </Link>

          <Link className={classes.link} to={ROUTE_PAGES.main}>
            <Typography className={classes.linkText}>Translator</Typography>
          </Link>

          <Link className={classes.link} to={ROUTE_PAGES.favorites}>
            <Typography className={classes.linkText}>Favorites</Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default Header;
