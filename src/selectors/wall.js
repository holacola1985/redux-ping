import { POST_TYPES } from '../postTypes';
import { createSelector } from 'reselect';

const getSize = state => state.size;

function shift(items, aggregated, size) {
  if (aggregated > size) {
    const shift = aggregated % size;
    const last = items.slice(0, size - shift);
    const first = items.slice(size - shift, size);
    return [...first, ...last];
  } else {
    return items.slice(-shift);
  }
}

const pack = {};

['all', ...POST_TYPES].forEach(type => {
  const getItems = state => state[type].items;
  const getAggregated = state => state[type].aggregated;
  pack[type] = createSelector([getItems, getAggregated, getSize], shift);
});

export default pack;
