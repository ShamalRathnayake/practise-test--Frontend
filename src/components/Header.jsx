import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalState";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
function Header() {
  const globalState = useContext(GlobalContext);

  const handleLogout = () => {
    globalState.authenticate(false);
    globalState.addUser({});
    globalState.addToken("");
    localStorage.removeItem("user-auth-token");
    window.location.replace("/login");
  };

  const classes = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link
              to="/"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontSize: "25px",
              }}
            >
              Practise Test
            </Link>
          </Typography>
          {!globalState.isAuthenticated ? (
            <div>
              <Link to="/login">
                <Button
                  color="secondary"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "15px",
                  }}
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  color="secondary"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "15px",
                  }}
                >
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/profile">
                <Button
                  color="secondary"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "15px",
                  }}
                >
                  Profile
                </Button>
              </Link>
              <Button
                color="secondary"
                onClick={handleLogout}
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "15px",
                }}
              >
                Logout
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
