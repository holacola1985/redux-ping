/* global Set */
import { POST_TYPES } from '../postTypes';
import { SET_SIZE, AGGREGATE } from '../actions/wall';

const supportedTypes = new Set();

var defaultState = {
  all: {
    items: [],
    aggregated: 0
  },
  size: 10
};

POST_TYPES.forEach(type => {
  defaultState[type] = {
    items: [],
    aggregated: 0
  };
  supportedTypes.add(type);
});


function aggregate(post, state) {
  const type = post.twp_source;
  var newState = {
    all: {
      aggregated: state.all.aggregated + 1,
      items: [...state.all.items.slice(-state.size + 1), post]
    }
  };

  if (type && supportedTypes.has(type)) {
    const {aggregated, items} = state[type];
    newState[type] = {
      aggregated: aggregated + 1,
      items: [...items.slice(-state.size + 1), post]
    };
  }
  return newState;
}

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
      return Object.assign({}, state, aggregate(action.post, state));
    default:
      return state;

  }
}
