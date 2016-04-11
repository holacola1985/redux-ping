import {POST_TYPES} from '../postTypes';
import { createSelector } from 'reselect';

const getSize = state => state.size;

function shift(items, aggregated, size) {
  const shift = aggregated % size;
  return [
    ...items.slice(-shift),
    ...items.slice(shift, size - 1)
  ];
}

const pack = {};

['all', ...POST_TYPES ].forEach(type => {
  const getItems = state => state[type].items;
  const getAggregated = state => state[type].aggregated;
  pack[type] = createSelector([getItems, getAggregated, getSize], shift);
});

export default pack;
