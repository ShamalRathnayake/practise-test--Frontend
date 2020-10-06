import Axios from "axios";

const baseUrl = "http://localhost:5000/";

export const getAllProducts = async () => {
  let result = await Axios.get(baseUrl + "api/products");
  return result;
};

export const addProduct = async (product, globalState) => {
  let result = await Axios.post(baseUrl + "api/products", product, {
    headers: { "x-auth-token": globalState.token },
  });
  return result;
};

export const editProduct = async (id,product, globalState) => {
  let result = await Axios.put(
    baseUrl + "api/products/" + id,
    product,
    {
      headers: { "x-auth-token": globalState.token },
    }
  ).then((res) => {
    window.location.replace("/");
  });
};

export const deleteProduct = async(id,globalState) => {
    let result = await Axios.delete(baseUrl + "api/products/" + id, {
      headers: { "x-auth-token": globalState.token },
    }).then((res) => {
      getAllProducts()
        .then((products) => {
          globalState.addProducts(products.data);
        })
        .catch((err) => console.log(err));
    });
}