export const SET_CACHE_SIZE = 'SET_CACHE_SIZE';

export function setSize(size) {
  return {
    type: SET_CACHE_SIZE,
    size
  };
}
