/* global Set */
import { SET_SIZE, AGGREGATE } from '../actions/wall';

const defaultState = {
  all: {
    items: [],
    aggregated: 0
  },
  twitter: {
    items: [],
    aggregated: 0
  },
  facebook: {
    items: [],
    aggregated: 0
  },
  size: 10
};

const POST_TYPES = new Set();
POST_TYPES.add('twitter');
POST_TYPES.add('facebook');
POST_TYPES.add('instagram');

function aggregate(post, state) {
  const type = post.twp_source;
  var newState = {
    all: {
      aggregated: state.all.aggregated + 1,
      items: [...state.all.items.slice(-state.size + 1), post]
    }
  };

  if (type && POST_TYPES.has(type)) {
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
