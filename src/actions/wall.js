require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';

export const AGGREGATE = 'AGGREGATE';
export const SET_SIZE = 'SET_SIZE';
export const FETCH_WALL_HISTORY = 'FETCH_WALL_HISTORY';

export function aggregate(post) {
  return {
    type: AGGREGATE,
    post
  };
}

export function setSize(size) {
  return {
    type: SET_SIZE,
    size
  };
}

export function fetchHistory(url) {
  return dispatch => {
    return fetch(url).then(response => {
      if(response.status === 404){
        return [];
      }else if(response.status >= 400){
        throw new Error('Fetch wall history error');
      }else{
        return response.json();
      }
    }).then(posts => {
      dispatch({
        type: FETCH_WALL_HISTORY,
        posts
      });
    });
  };
}
