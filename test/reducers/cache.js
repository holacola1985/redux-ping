import { cache } from '../../src/reducers/cache';
import { setSize } from '../../src/actions/cache';
import { aggregate } from '../../src/actions/wall';
import { aggregate as aggregateGeo } from '../../src/actions/geo';
import { expect } from 'chai';

describe('cache', () => {

  function aggregateSequence(n, initialState) {
    var reduce = cache(initialState, generatePost(0));
    for (var i = 1; i < n; i++) {
      reduce = cache(reduce, generatePost(i));
    }
    return reduce;
  }

  function generatePost(i) {
    return aggregate({
      _id: i,
      _source: 'twitter',
      text: 'text ' + i
    });
  }

  it('should be initialized', () => {
    expect(cache(undefined, {
      type: 'UNKNOW'
    })).to.be.deep.equal({
      size: 500,
      byId: {},
      ids: []
    });
  });

  it('should aggregate one post', () => {
    const {byId, ids} = cache(undefined, aggregate({
      _id: 123,
      text: 'yolo'
    }));
    expect(byId).to.have.property('123');
    expect(ids[0]).to.be.equal(123);
    expect(byId['123'].wall.text).to.be.equal('yolo');
  });

  it('should aggregate two post', () => {
    const {byId, ids} = aggregateSequence(2);
    expect(byId).to.have.property('0');
    expect(byId).to.have.property('1');
    expect(ids[1]).to.be.equal(1);
    expect(byId['1'].wall.text).to.be.equal('text 1');
  });

  it('should set the cache size', () => {
    var {size} = cache(undefined, setSize(5));
    expect(size).to.be.equal(5);
  });

  it('should aggregate over the limit', () => {
    var state = cache(undefined, setSize(5));
    state = aggregateSequence(10, state);
    expect(state.size).to.be.equal(5);
    expect(state.ids).to.be.deep.equal([5, 6, 7, 8, 9]);
    expect(state.byId).to.not.have.property(0);
    expect(state.byId).to.not.have.property(4);
    expect(state.byId).to.have.property(5);
    expect(state.byId).to.have.property(9);
  });

  it('should aggregate merge data from different sources on same post', () => {
    var state = cache(undefined, aggregateGeo({
      _id: 123,
      geojson: {
        type: 'Point',
        coordinates: [-5, 12.3]
      }
    }));

    state = cache(state, aggregate({
      _id: 123,
      text: 'yolo'
    }));

    const {byId, ids} = state;

    expect(byId).to.have.property('123');
    expect(ids).to.have.lengthOf(1);
    expect(ids[0]).to.be.equal(123);
    expect(byId['123'].wall.text).to.be.equal('yolo');
    expect(byId['123'].geo.geojson.coordinates[0]).to.be.equal(-5);
  });

});
