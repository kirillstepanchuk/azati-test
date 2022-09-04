import React, { useState } from "react";
import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import TranslateIcon from "@mui/icons-material/Translate";
import MenuIcon from "@mui/icons-material/Menu";

import { Link as RouterLink } from "react-router-dom";

import { ROUTE_PAGES } from "../../constants";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import Container from "../Container/Container";

const useStyles = makeStyles((theme) =>
  createStyles({
    mainContainer: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  })
);

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const classes = useStyles();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="relative" className={classes.mainContainer}>
      <Container>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={5.5}>
            <Grid sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="headerLink"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                keepMounted
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Button
                    component={RouterLink}
                    size="small"
                    to={ROUTE_PAGES.main}
                    color="headerMenuLink"
                  >
                    Translator
                  </Button>
                </MenuItem>

                <MenuItem onClick={handleCloseNavMenu}>
                  <Button
                    component={RouterLink}
                    size="small"
                    to={ROUTE_PAGES.favorites}
                    color="headerMenuLink"
                  >
                    Favorites
                  </Button>
                </MenuItem>
              </Menu>
            </Grid>

            <Grid sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                component={RouterLink}
                size="small"
                to={ROUTE_PAGES.main}
                className={classes.link}
                color="headerLink"
              >
                Translator
              </Button>

              <Button
                component={RouterLink}
                size="small"
                to={ROUTE_PAGES.favorites}
                className={classes.link}
                color="headerLink"
              >
                Favorites
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={1}>
            <Grid container justifyContent="center">
              <RouterLink className={classes.link} to={ROUTE_PAGES.main}>
                <IconButton className={classes.logo} color="headerLink">
                  <TranslateIcon />
                </IconButton>
              </RouterLink>
            </Grid>
          </Grid>

          <Grid item xs={5.5}>
            <Grid container justifyContent="flex-end">
              <ThemeSwitch />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};

export default Header;
