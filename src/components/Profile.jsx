import { Button, Grid, InputLabel, TextField } from "@material-ui/core";
import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { baseUrl } from "../auth/checkAuth";

function Profile() {
  const [user, setuser] = useState({});
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [error, seterror] = useState("");

  const globalState = useContext(GlobalContext);

  useEffect(() => {
    //cannot be replaced with checkAuth()
    //another function is called inside the code block
    const checkLoggedIn = async () => {
      const token = await localStorage.getItem("user-auth-token");
      if (token === null || token === "") {
        console.log("no token");
        window.location.replace("/login");
        return null;
      }
      return token;
    };
    checkLoggedIn()
      .then(async (token) => {
        if (token) {
          let user = await Axios.get(baseUrl + "api/auth/user", {
            headers: { "x-auth-token": token },
          });
          globalState.addUser(user);
          globalState.authenticate(true);
          globalState.addToken(token);
          //calling another function to load user data into state
          getUser(token, user.data._id);
          return true;
        } else {
          console.log("null token");
          window.location.replace("/login");
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let getUser = async (token, id) => {
    let user = await Axios.get(baseUrl + "api/users/" + id, {
      headers: { "x-auth-token": token },
    });

    setuser(user.data);
  };

  const handleEdit = () => {
    console.log("update clicked");
    if (
      !firstName ||
      firstName === "" ||
      !email ||
      email === "" ||
      !lastName ||
      lastName === "" ||
      !phone ||
      phone === "" ||
      !address ||
      address === ""
    ) {
      seterror("Please fill all fields");
    } else {
      let newUserProfile = {
        _id: user._id,
        first_name: firstName,
        last_name: lastName,
        address: address,
        email: email,
        phone: phone,
      };

      let updateUser = async () => {
        let result = await Axios.put(baseUrl + "api/users", newUserProfile, {
          headers: { "x-auth-token": globalState.token },
        });

        window.location.replace("/profile");
        return result;
      };

      updateUser();
    }
  };

  const handleDelete = async () => {
    let result = await Axios.delete(baseUrl + "api/users/" + user._id, {
      headers: { "x-auth-token": globalState.token },
    })
      .then((res) => {
        globalState.authenticate(false);
        globalState.addUser({});
        globalState.addToken("");
        localStorage.removeItem("user-auth-token");
        window.location.replace("/login");
      })
      .catch((err) => console.log(err));
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
        <Grid item xs={4}>
          <br />
          <h4>Profile Details</h4>
          <br />
          <form className="" noValidate autoComplete="off">
            <InputLabel>First Name : {user.first_name}</InputLabel>
            <br />
            <br />
            <InputLabel>Last Name : {user.last_name}</InputLabel>
            <br />
            <br />
            <InputLabel>Email : {user.email}</InputLabel>
            <br />
            <br />
            <InputLabel>Address : {user.address}</InputLabel>

            <br />
            <br />
            <InputLabel>Phone : {user.phone}</InputLabel>
            <br />
            <br />
          </form>
        </Grid>
        <Grid item xs={4}>
          <br />
          <h4>Edit Profile</h4>
          <br />
          <form className="" noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              type="text"
              required
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              type="text"
              required
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
              label="Phone"
              variant="outlined"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              type="number"
              required
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
              required
            />
            <br />
            <br />
            <div className="error">{error}</div>
            <br />
            <br />
            <Button variant="outlined" color="primary" onClick={handleEdit}>
              Save Edited Profile
            </Button>
          </form>
          <br />
        </Grid>
        <Grid item xs={4}>
          <Button variant="outlined" color="secondary" onClick={handleDelete}>
            Delete Profile
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
