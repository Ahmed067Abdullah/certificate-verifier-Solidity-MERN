import actionTypes from "./AuthModal.types";

const initialState = {
  id: '',
  name: '',
  email: ''
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        ...payload
      };
    case actionTypes.LOGOUT:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default reducer;