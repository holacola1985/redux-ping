import { geoBoundingBox } from '../utils/url';
import { fetchJSON } from '../utils/network';

export const FETCH_GEO_HISTORY = 'FETCH_GEO_HISTORY';
export const AGGREGATE_GEO = 'AGGREGATE_GEO';
export const SET_GEO_SIZE = 'SET_GEO_SIZE';

export function aggregate(post) {
  return {
    type: AGGREGATE_GEO,
    post
  };
}

export function setSize(size) {
  return {
    type: SET_GEO_SIZE,
    size
  };
}

export function fetchHistory(id, options_) {
  return (dispatch, getState) => {
    const options = Object.assign({
      size: getState().geo.size
    }, options_);
    return fetchJSON(geoBoundingBox(id, options)).then(posts => {
      dispatch({
        type: FETCH_GEO_HISTORY,
        posts
      });
    });
  };
}
