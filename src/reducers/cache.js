//import { POST_TYPES } from '../postTypes';
import { AGGREGATE_WALL } from '../actions/wall';
import { SET_CACHE_SIZE } from '../actions/cache';

function aggregate(state, post) {
  const {size, ids, byId} = state;
  var wrapped = {};
  //console.log(ids, post);
  wrapped[post._id] = post;
  var newState = Object.assign({
    byId: Object.assign({}, byId, wrapped),
    ids: [...ids, post._id],
    size
  });
  while(newState.ids.length > size){
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
      return aggregate(state, action.post);
    case SET_CACHE_SIZE:
      return Object.assign({}, state, {
        size: action.size
      });
    default:
      return state;
  }
}
