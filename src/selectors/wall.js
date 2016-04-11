import { createSelector } from 'reselect';


const getSize = state => state.size;

const getAllItems = state => state.all.items;
const getAllAggregated = state => state.all.aggregated;

const getTwitterItems = state => state.twitter.items;
const getTwitterAggregated = state => state.twitter.aggregated;

function shift(items, aggregated, size) {
  const shift = aggregated % size;
  return [
    ...items.slice(-shift),
    ...items.slice(shift, size - 1)
  ];
}

const staticPosition = createSelector([getAllItems, getAllAggregated, getSize], shift);
const twitterStaticPosition = createSelector([
  getTwitterItems, getTwitterAggregated, getSize
], shift);

export { staticPosition, twitterStaticPosition };
