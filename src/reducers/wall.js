/* global Set */
import { POST_TYPES } from '../postTypes';
import { SET_SIZE, AGGREGATE, FETCH_WALL_HISTORY } from '../actions/wall';

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
  const type = post._source;
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
      if (action.size === state.size) {
        return state;
      } else {
        var newState = {
          size: action.size
        };
        [...POST_TYPES, 'all'].forEach(type => {
          const {items, aggregated} = state[type];
          newState[type] = {
            items: items.slice(-action.size),
            aggregated
          };
        });
        return newState;
      }
    case AGGREGATE:
      return Object.assign({}, state, aggregate(action.post, state));
    case FETCH_WALL_HISTORY:
      return action.posts.reduce((memo, post) => {
        return Object.assign({}, memo, aggregate(post, memo));
      }, state);
    default:
      return state;

  }
}
