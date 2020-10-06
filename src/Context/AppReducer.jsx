export default (state, action) => {
  switch (action.type) {
    default:
      return state;

    case "ADD_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "ADD_TOKEN":
      return {
        ...state,
        token: action.payload,
      };

    case "AUTHENTICATE":
      return {
        ...state,
        isAuthenticated: action.payload,
      };

    case "ADD_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
  }
};
