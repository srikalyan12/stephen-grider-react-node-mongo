import { FETCH_SURVEYS } from './../actions/types';

const surveysReducers = (state = [], action) => {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
};

export default surveysReducers;
