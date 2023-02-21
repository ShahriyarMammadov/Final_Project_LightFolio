let initialState = {
  loading: true,
  data: undefined,
  allCountry: undefined,
  error: undefined,
};

export const getAllUserDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PENDING":
      return {
        loading: true,
      };
    case "FULFILLED":
      return {
        loading: false,
        data: action.payload,
      };

    default:
      return state;
  }
};
