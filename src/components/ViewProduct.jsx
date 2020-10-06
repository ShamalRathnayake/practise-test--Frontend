import { Button, Grid, InputLabel, TextField } from "@material-ui/core";
import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { checkAuth, baseUrl } from "../auth/checkAuth";
import { GlobalContext } from "../Context/GlobalState";

function ViewProduct(props) {
  const globalState = useContext(GlobalContext);

  const [user, setuser] = useState({});

  useEffect(() => {
    //checking for authentication on component mount
    checkAuth(globalState);
  }, []);

  useEffect(() => {
    let getUser = async () => {
      let user = await Axios.get(
        baseUrl + "api/users/" + props.location.state.user_id,
        { headers: { "x-auth-token": globalState.token } }
      );

      setuser(user);
    };
    getUser();
  }, []);
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
          <br />
          <h4>Product Details</h4>
          <br />
          <form className="" noValidate autoComplete="off">
            <InputLabel>Product Name : {props.location.state.name}</InputLabel>
            <br />
            <br />
            <InputLabel>
              Product Description : {props.location.state.desc}
            </InputLabel>
            <br />
            <br />
            <InputLabel>
              Product Quantity : {props.location.state.quantity}
            </InputLabel>

            <br />
            <br />
            <InputLabel>
              Created By :{" "}
              {typeof user.data !== "undefined"
                ? user.data.first_name + " " + user.data.last_name
                : ""}
            </InputLabel>
            <br />
            <br />
            <Button
              variant="outlined"
              color="primary"
              onClick={(e) => window.location.replace("/")}
            >
              Back
            </Button>
          </form>
          <br />
        </Grid>
      </Grid>
    </div>
  );
}

export default ViewProduct;
