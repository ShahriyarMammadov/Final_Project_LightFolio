import axios from "axios";

//------------------ Get User ------------------
export const getUserAllDataAction = (userData) => {
  try {
    return (dispatch) => {
      dispatch({
        type: "PENDING",
      });
      dispatch({
        type: "FULFILLED",
        payload: userData,
      });
    };
  } catch (error) {}
};
//----------------------------------------------

//--------------- Get All Counrty --------------
export const getAllcountryAction = () => {
  return async (dispatch) => {
    dispatch({
      type: "PENDING",
    });
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then((result) => {
        dispatch({
          type: "FULFILLED",
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "REJECTED",
          payload: error,
        });
      });
  };
};
//----------------------------------------------
