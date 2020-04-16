import React, { useContext, useEffect } from "react";
import { Link } from "gatsby";

// Import Firebase elements and initialize it
import { firebase, signIn, signOut } from "../API/Firebase";
import "firebase/auth";
import "firebase/firestore";

import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider";

import styles from "./user.module.scss";

//IMPORT MATERIAL UI
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Nook from "../images/isa.png";

import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

import IconButton from "@material-ui/core/IconButton";

import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";

import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    color: "white",
    fontFamily: "Francois One",
    fontSize: "160%",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  subtitle: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,

    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const User = () => {
  const classes = useStyles();

  // CHANGE TO FUNCTIONNAL COMPONENT
  const dispatch = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {state.user ? (
        <MenuItem onClick={signOut}>Logout</MenuItem>
      ) : (
        <MenuItem onClick={signIn}>Login</MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton color="inherit">
          <Link style={{ textDecoration: "none", color: "black" }} to="/search">
            <SearchIcon />
          </Link>
        </IconButton>
        <p>Search</p>
      </MenuItem>
      <MenuItem>
        <IconButton color="inherit">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/upload-pattern"
          >
            <CloudUploadIcon />
          </Link>
        </IconButton>
        <p>Upload</p>
      </MenuItem>
      {state.user ? (
        <MenuItem onClick={signOut}>
          <IconButton color="inherit">
            <ExitToAppIcon />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      ) : (
        <MenuItem onClick={signIn}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Login</p>
        </MenuItem>
      )}
    </Menu>
  );

  const dispatchUser = user => {
    if (state.user === null) {
      dispatch({
        type: "USER",
        text: {
          username: user.displayName,
          email: user.email,
          photo: user.photoURL,
          uid: user.uid,
        },
      });
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //User sign in
        dispatchUser(user);
      } else {
        // User is signed out.
        dispatch({
          type: "USER",
          text: null,
        });
      }
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.userPanel}>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <img className={styles.nook} src={Nook} />
            <Typography className={classes.title} variant="h1" noWrap>
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                #ACNH Pattern
              </Link>
            </Typography>
            <div className={classes.subtitle}>
              <p>The place to share and find cool patterns!</p>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit">
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Search by designer"
                  aria-label="search"
                >
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/search"
                  >
                    <SearchIcon />
                  </Link>
                </Tooltip>
              </IconButton>
              <Tooltip
                TransitionComponent={Zoom}
                title="Upload a new design"
                aria-label="upload"
              >
                <IconButton color="inherit">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/upload-pattern"
                  >
                    <CloudUploadIcon />
                  </Link>
                </IconButton>
              </Tooltip>
              {state.user ? (
                <MenuItem onClick={signOut}>
                  <IconButton color="inherit">
                    <ExitToAppIcon />
                  </IconButton>
                  <p>Logout</p>
                </MenuItem>
              ) : (
                <MenuItem onClick={signIn}>
                  <IconButton color="inherit">
                    <AccountCircle />
                  </IconButton>
                  <p>Login</p>
                </MenuItem>
              )}
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    </div>
  );
};

export default User;
