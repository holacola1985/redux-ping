export const AGGREGATE = 'AGGREGATE';
export const SET_SIZE = 'SET_SIZE';

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
