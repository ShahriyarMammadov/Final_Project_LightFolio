// Added
export const favoriteAction = (obj) => {
  return async (dispatch) => {
    dispatch({
      type: "FAVORITE",
      payload: obj,
    });
  };
};

// Delete
export const deleteFavoriteAction = (obj) => {
  return async (dispatch) => {
    dispatch({
      type: "DEL_FAVORITE",
      payload: obj,
    });
  };
};
