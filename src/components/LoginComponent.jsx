import { Button, Grid, TextField } from "@material-ui/core";
import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { checkAuthLogin, baseUrl } from "../auth/checkAuth";
import { GlobalContext } from "../Context/GlobalState";

function LoginComponent() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");

  const globalState = useContext(GlobalContext);

  useEffect(() => {
    //checking for authentication on component mount
    checkAuthLogin(globalState);
  }, []);

  const handleLogin = () => {
    if (email && password && email !== "" && password !== "") {
      let data = {
        email: email.toString().trim(),
        password: password.toString().trim(),
      };
      Axios.post( baseUrl + "api/auth", data).then((res) => {
        console.log("auth done");
        console.log(res);
        localStorage.setItem("user-auth-token", res.data.token);
        window.location.replace("/");
      });
    } else {
      seterror("Please Fill all Fields");
    }
  };

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ textAlign: "center", height: "100%" }}
      >
        <Grid item>
          <h1>Login</h1>
          <br />
          <form className="" noValidate autoComplete="off">
            <TextField
              id="outlined-basic-email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
              type="email"
            />
            <br />

            <br />
            <TextField
              id="outlined-basic-password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
              type="password"
            />
            <br />
            <br />
            <div className="error">{error}</div>
            <br />
            <div>
              <Button variant="outlined" color="primary" onClick={handleLogin}>
                Login
              </Button>
            </div>
          </form>
          <br />
        
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginComponent;
