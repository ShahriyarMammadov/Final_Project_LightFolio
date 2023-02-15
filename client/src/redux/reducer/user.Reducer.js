export const getAllUserDataReducer = (state = [], action) => {
  switch (action.type) {
    case "SUCCESSFULLY":
      return [action.payload];

    default:
      return state;
  }
};
