import { createSelector } from 'reselect';

const getSize = state => state.size;

const getAllItems = state => state.all.items;
const getAllAggregated = state => state.all.aggregated;

const getTwitterItems = state => state.twitter.items;
const getTwitterAggregated = state => state.twitter.aggregated;

const getFacebookItems = state => state.facebook.items;
const getFacebookAggregated = state => state.facebook.aggregated;

function shift(items, aggregated, size) {
  const shift = aggregated % size;
  return [
    ...items.slice(-shift),
    ...items.slice(shift, size - 1)
  ];
}

const all = createSelector([getAllItems, getAllAggregated, getSize], shift);
const twitter = createSelector([
  getTwitterItems, getTwitterAggregated, getSize
], shift);
const facebook = createSelector([
  getFacebookItems, getFacebookAggregated, getSize
], shift);

export default {
  all,
  twitter,
  facebook
};
