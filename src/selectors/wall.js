import { createSelector } from 'reselect';

const getItems = state => state.items;
const getAggregated = state => state.aggregated;
const getSize = state => state.size;

const staticPosition = createSelector([
  getItems, getAggregated, getSize
], (items, aggregated, size) => {
  const shift = aggregated % size;
  return [
    ...items.slice(-shift),
    ...items.slice(shift, size - 1)
  ];
});

export { staticPosition };
