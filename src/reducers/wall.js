import { SET_SIZE, AGGREGATE } from '../actions/wall';

const defaultState = {
  items: [],
  size: 10
};

export default function wall(state = defaultState, action) {
  switch (action.type) {
    case SET_SIZE:
      return state.size === action.size ? state : {
        size: action.size,
        items: state.items.slice(-action.size)
      };
    case AGGREGATE:
      return Object.assign({}, state, {
        items: [...state.items.slice(-state.size + 1), action.post]
      });
    default:
      return state;

  }
}
