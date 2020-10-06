import { Button, Grid, TextField } from "@material-ui/core";
import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { checkAuth, baseUrl } from "../auth/checkAuth";
import { GlobalContext } from "../Context/GlobalState";
import { addProduct, getAllProducts } from "../crud/products";

function NewProduct() {
  const globalState = useContext(GlobalContext);
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [quantity, setquantity] = useState("");
  const [error, seterror] = useState("");

  useEffect(() => {
    //checking for authentication on component mount
    checkAuth(globalState);
  }, []);

  const handleAdd = () => {
    if (
      !name ||
      name === "" ||
      !description ||
      description === "" ||
      !quantity ||
      quantity === ""
    ) {
      seterror("Please fill all fields");
    } else {
      let product = {
        name: name.toString(),
        description: description.toString(),
        quantity: parseInt(quantity.toString().trim()),
        user_id: globalState.user.data._id.toString(),
      };
      addProduct(product, globalState).then(() => {
        window.location.replace("/");
      });
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
          <br />
          <h3>Add New Product</h3>
          <br />
          <form className="" noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setname(e.target.value)}
              type="text"
              required
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              type="text"
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Quantity"
              variant="outlined"
              value={quantity}
              onChange={(e) => setquantity(e.target.value)}
              type="number"
              required
            />

            <br />
            <br />
            <div className="error">{error}</div>
            <br />
            <br />
            <Button variant="outlined" color="primary" onClick={handleAdd}>
              Add New Product
            </Button>
          </form>
          <br />
        </Grid>
      </Grid>
    </div>
  );
}

export default NewProduct;
