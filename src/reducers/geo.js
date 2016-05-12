import { SET_GEO_SIZE, FETCH_GEO_HISTORY } from '../actions/geo';

const defaultState = {
  size: 20,
  all: []
};

export default function geo(state = defaultState, action) {
  const {type, size, posts} = action;
  switch (type) {
    case SET_GEO_SIZE:
      return Object.assign({}, state, {
        size
      });
    case FETCH_GEO_HISTORY:
      return Object.assign({}, state, {
        all: posts
      });
    default:
      return state;
  }
}
