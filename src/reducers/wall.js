import { SET_SIZE, AGGREGATE } from '../actions/wall';

const defaultState = {
  all: {
    items: [],
    aggregated: 0
  },
  size: 10
};

export default function wall(state = defaultState, action) {
  switch (action.type) {
    case SET_SIZE:
      return state.size === action.size ? state : Object.assign({}, state, {
        size: action.size,
        all: {
          items: state.all.items.slice(-action.size)
        }
      });
    case AGGREGATE:
      return Object.assign({}, state, {
        all: {
          aggregated: state.all.aggregated + 1,
          items: [...state.all.items.slice(-state.size + 1), action.post]
        }
      });
    default:
      return state;

  }
}
