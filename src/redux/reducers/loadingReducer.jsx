import { OFF_LOADING, ON_LOADING } from "../constants/loadingConstant";

const initialState = {
  isLoading: false,
};

export const loadingReducer = (state = initialState, { type }) => {
  switch (type) {
    case ON_LOADING: {
      return { ...state, isLoading: true };
    }
    case OFF_LOADING: {
      return { ...state, isLoading: false };
    }
    default:
      return state;
  }
};
