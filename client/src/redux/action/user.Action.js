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
export const getAllcountryAction = async () => {
  return async (dispatch) => {
    dispatch({
      type: "Pending",
    });
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then((result) => {
        dispatch({
          type: "SEARCH_UNIVERSITY_SUCCESS",
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "SEARCH_UNIVERSITY_FAIL",
          payload: error,
        });
      });
  };
};
//----------------------------------------------
