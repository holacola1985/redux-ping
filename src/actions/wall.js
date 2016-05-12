import { wall as wallUrl } from '../utils/url';
import { fetchJSON } from '../utils/network';

export const AGGREGATE_WALL = 'AGGREGATE_WALL';
export const SET_WALL_SIZE = 'SET_WALL_SIZE';
export const FETCH_WALL_HISTORY = 'FETCH_WALL_HISTORY';

export function aggregate(post) {
  return {
    type: AGGREGATE_WALL,
    post
  };
}

export function setSize(size) {
  return {
    type: SET_WALL_SIZE,
    size
  };
}

export function fetchHistory(id, options_) {
  return (dispatch, getState) => {
    const options = Object.assign({
      size: getState().wall.size
    }, options_);
    return fetchJSON(wallUrl(id, options)).then(posts => {
      dispatch({
        type: FETCH_WALL_HISTORY,
        posts
      });
    });
  };
}
