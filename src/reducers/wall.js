import { SET_SIZE, AGGREGATE } from '../actions/wall';

const defaultState = {
  items: [],
  size: 10
};

export default function wall(state = defaultState, action) {
  switch (action.type) {
    case SET_SIZE:
      return state;
    case AGGREGATE:
      return Object.assign({}, state, {
        items: [...state.items, action.post]
      });
    default:
      return state;

  }
}
