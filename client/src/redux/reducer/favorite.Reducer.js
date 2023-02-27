export default function favReducer(state = [], action) {
  switch (action.type) {
    case "FAVORITE":
      return [...state, action.payload];
    case "DEL_FAVORITE":
      return [...state.filter((e) => e._id !== action.payload._id)];

    default:
      return state;
  }
}
