import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { deleteProduct, getAllProducts } from "../crud/products";
import { Link, Route } from "react-router-dom";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import EditProduct from "./EditProduct";
import { checkAuth, baseUrl } from "../auth/checkAuth";

function HomeComponent() {

  const globalState = useContext(GlobalContext);

  useEffect(() => {
    //checking for authentication on component mount
    checkAuth(globalState);
  }, []);

  useEffect(() => {
    getAllProducts()
      .then((products) => {
        globalState.addProducts(products.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id, globalState) => {
    deleteProduct(id,globalState)
  };

  const rows = globalState.products.map((product) => {
    return {
      id: product._id,
      name: product.name,
      desc: product.description,
      quantity: product.quantity,
      user_id: product.user_id,
    };
  });
  return (
    <div>
      <br />
      <h3 style={{ textAlign: "center" }}>Products List</h3>
      <br />
      <br />
      <Link to="/addproduct">
        <Button
          style={{ backgroundColor: "green", color: "#fff", margin: "25px" }}
        >
          Add New Product
        </Button>{" "}
      </Link>
      <br />
      <br />
      <TableContainer
        component={Paper}
        style={{ padding: "50px", textAlign: "center" }}
      >
        <Table className="" size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">View</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} style={{ cursor: "pointer" }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">
                  <Link
                    to={{
                      pathname: "/viewproduct",
                      state: {
                        id: row.id,
                        name: row.name,
                        desc: row.desc,
                        quantity: row.quantity,
                        user_id: row.user_id,
                      },
                    }}
                  >
                    <Button style={{ backgroundColor: "blue", color: "#fff" }}>
                      +
                    </Button>{" "}
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <Link
                    to={{
                      pathname: "/editproduct",
                      state: {
                        id: row.id,
                        name: row.name,
                        desc: row.desc,
                        quantity: row.quantity,
                      },
                    }}
                  >
                    <Button style={{ backgroundColor: "blue", color: "#fff" }}>
                      ^
                    </Button>{" "}
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={(e) => handleDelete(row.id, globalState)}
                    style={{ backgroundColor: "red", color: "#fff" }}
                  >
                    x
                  </Button>{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <br />
      <br />
    </div>
  );
}

export default HomeComponent;
