import { Button, Grid, TextField } from "@material-ui/core";
import Axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalState";

function RegisterComponent() {
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [conf_password, setconf_password] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [error, seterror] = useState("");

  const baseUrl = "http://localhost:5000/";

  const globalState = useContext(GlobalContext);

  const handleRegister = () => {
    if (
      !first_name ||
      first_name === "" ||
      !email ||
      email === "" ||
      !password ||
      password === "" ||
      !conf_password ||
      conf_password === ""
    ) {
      seterror("Please fill all required fields");
    } else {
      if (password.length < 5 || conf_password.length < 5) {
        seterror("Password must be longer than 5 characters");
      } else {
        if (password !== conf_password) {
          seterror("Passwords do not match");
        } else {
          let newUser = {
            first_name: first_name.toString(),
            last_name: last_name.toString() || "",
            email: email.toString().trim(),
            password: password.toString().trim(),
            conf_password: conf_password.toString().trim(),
            phone: phone.toString().trim() || "",
            address: address.toString() || "",
          };

          const addUser = async () => {
            let result = await Axios.post(baseUrl + "api/users", newUser);
            return result;
          };

          addUser()
            .then((res) => {
              console.log(res);
              globalState.addUser(res.data.user);
              globalState.addToken(res.data.token);
              localStorage.setItem("user-auth-token", res.data.token);
              window.location.replace("/");
            })
            .catch((err) => console.log(err));
        }
      }
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
        <Grid item xs={12}>
          <h1>Register</h1>
          <br />
          <form className="" noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              value={first_name}
              onChange={(e) => setfirst_name(e.target.value)}
              type="text"
              required
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              value={last_name}
              onChange={(e) => setlast_name(e.target.value)}
              type="text"
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type="email"
              required
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              required
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              value={conf_password}
              onChange={(e) => setconf_password(e.target.value)}
              type="password"
              required
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              type="number"
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              type="text"
            />
            <br />
            <br />
            <div className="error">{error}</div>
            <br />
            <br />
            <Button variant="outlined" color="primary" onClick={handleRegister}>
              Register
            </Button>
          </form>
          <br />

    
        </Grid>
      </Grid>
    </div>
  );
}

export default RegisterComponent;
