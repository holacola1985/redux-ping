export const FETCH_GEO_HISTORY = 'FETCH_GEO_HISTORY';
export const AGGREGATE_GEO = 'AGGREGATE_GEO';

export function aggregate(post) {
  return {
    type: AGGREGATE_GEO,
    post
  };
}
