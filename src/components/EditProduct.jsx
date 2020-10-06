import { Button, Grid, TextField } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { checkAuth } from "../auth/checkAuth";
import { GlobalContext } from "../Context/GlobalState";
import { editProduct } from "../crud/products";

function EditProduct(props) {
  const [name, setname] = useState(props.location.state.name);
  const [description, setdescription] = useState(props.location.state.desc);
  const [quantity, setquantity] = useState(props.location.state.quantity);
  const [error, seterror] = useState("");

  const globalState = useContext(GlobalContext);

  useEffect(() => {
    //checking for authentication on component mount
    checkAuth(globalState);
  }, []);

  const handleAdd = async () => {
    if (
      !name ||
      name === "" ||
      !description ||
      description === "" ||
      !quantity ||
      quantity === ""
    ) {
      seterror("Please fill all Fields");
    } else {
      let updatedProduct = {
        name: name.toString(),
        description: description.toString(),
        quantity: quantity.toString().trim(),
        user_id: globalState.user.data._id.toString().trim(),
      };
      editProduct(props.location.state.id, updatedProduct, globalState);
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
          <h4>Edit Product</h4>
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
              Save Edited Product
            </Button>
          </form>
          <br />
        </Grid>
      </Grid>
    </div>
  );
}

export default EditProduct;
