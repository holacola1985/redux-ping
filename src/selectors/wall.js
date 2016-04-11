import { createSelector } from 'reselect';


const getAllItems = state => state.all.items;
const getAllAggregated = state => state.all.aggregated;
const getSize = state => state.size;

const staticPosition = createSelector([
  getAllItems, getAllAggregated, getSize
], (items, aggregated, size) => {
  const shift = aggregated % size;
  return [
    ...items.slice(-shift),
    ...items.slice(shift, size - 1)
  ];
});

export { staticPosition };
