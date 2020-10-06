import React, { useContext, useEffect } from "react";
import "./App.css";
import LoginComponent from "./components/LoginComponent";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import RegisterComponent from "./components/RegisterComponent";
import HomeComponent from "./components/HomeComponent";
import Header from "./components/Header";
import { GlobalContext } from "./Context/GlobalState";
import NewProduct from "./components/NewProduct";
import EditProduct from "./components/EditProduct";
import ViewProduct from "./components/ViewProduct";
import Profile from "./components/Profile";

function App() {

const globalState = useContext(GlobalContext)


  useEffect(() => {
    
  }, []);
  return (
    <div className="App">
      <Router>
        <Header />

        <Route exact path="/" render={() => <HomeComponent />} />
        <Route path="/login" render={() => <LoginComponent />} />
        <Route path="/register" render={() => <RegisterComponent />} />
        <Route path="/addproduct" render={() => <NewProduct />} />
        <Route
          path="/editproduct"
          render={(props) => <EditProduct {...props} />}
        />
        <Route
          path="/viewproduct"
          render={(props) => <ViewProduct {...props} />}
        />
        <Route path="/profile" render={() => <Profile />} />
      </Router>
    </div>
  );
}

export default App;
