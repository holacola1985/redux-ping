require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';

export function parseJSONResponse(response) {
  if (response.status === 404) {
    return [];
  } else if (response.status >= 400) {
    throw new Error('Fetch geo history error');
  } else {
    return response.json();
  }
}

export function fetchJSON(url) {
  return fetch(url).then(parseJSONResponse);
}

