let initialState = {
  loading: true,
  allCountry: undefined,
  error: undefined,
};

export const getAllCountryReducer = (state = initialState, action) => {
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
    case "REJECTED":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
