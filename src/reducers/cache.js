//import { POST_TYPES } from '../postTypes';
import { AGGREGATE_WALL } from '../actions/wall';
import { AGGREGATE_GEO } from '../actions/geo';
import { SET_CACHE_SIZE } from '../actions/cache';


function wrap(key, content) {
  const obj = {};
  obj[key] = content;
  return obj;
}

function aggregate(state, post, namespace) {
  const exists = state.byId[post._id] !== undefined;
  const agg = Object.assign({}, state.byId[post._id], wrap(namespace, post));
  const {size, ids, byId} = state;
  var newState = Object.assign({
    byId: Object.assign({}, byId, wrap(post._id, agg)),
    ids: exists ? ids : [...ids, post._id],
    size
  });
  while (!exists && newState.ids.length > size) {
    newState = remove(newState);
  }
  return newState;
}

function remove(state) {
  const {ids, size, byId} = state;
  const newIds = ids.slice(1, size + 1);
  return {
    ids: newIds,
    byId: newIds.reduce((memo, id) => {
      memo[id] = byId[id];
      return memo;
    }, {}),
    size
  };
}

const defaultValue = {
  size: 500,
  byId: {},
  ids: []
};

export function cache(state = defaultValue, action) {
  switch (action.type) {
    case AGGREGATE_WALL:
      return aggregate(state, action.post, 'wall');
    case AGGREGATE_GEO:
      return aggregate(state, action.post, 'geo');
    case SET_CACHE_SIZE:
      return Object.assign({}, state, {
        size: action.size
      });
    default:
      return state;
  }
}
