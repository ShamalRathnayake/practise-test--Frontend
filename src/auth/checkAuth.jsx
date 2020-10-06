import Axios from "axios";

//base URL for Axios
export const baseUrl = "http://localhost:5000/";


//function to check user authentication
export function checkAuth(globalState) {
  const checkLoggedIn = async () => {
      //fetching JWT from local storage
    const token = await localStorage.getItem("user-auth-token");
    if (token === null || token === "") {
      console.log("no token");
      //redirecting to login if JWT doesnt exist
      window.location.replace("/login");
      return null;
    }
    return token;
  };
  checkLoggedIn()
    .then(async (token) => {
      if (token) {
          //verifying user with JWT
        let user = await Axios.get(baseUrl + "api/auth/user", {
          headers: { "x-auth-token": token },
        });
        //loading user data into global store
        globalState.addUser(user);
        globalState.authenticate(true);
        globalState.addToken(token);
        return true;
      } else {
          //redirecting to login if JWT is null
        console.log("null token");
        window.location.replace("/login");
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

//function to check user authentication in login component
export function checkAuthLogin(globalState){
    const checkLoggedIn = async () => {
      //fetching JWT from local storage
      const token = await localStorage.getItem("user-auth-token");
      if (token === null || token === "") {
        console.log("no token");
        return null;
      }
      console.log(token);
      return token;
    };
    checkLoggedIn()
      .then(async (token) => {
        if (token) {
          //verifying user with JWT
          let user = await Axios.get(baseUrl + "api/auth/user", {
            headers: { "x-auth-token": token },
          });
          //loading user data into global store
          globalState.addUser(user);
          globalState.authenticate(true);
          window.location.replace("/");
          return true;
        } else {
          console.log("null token")
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });

}