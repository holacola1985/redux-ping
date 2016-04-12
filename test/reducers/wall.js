import wall from '../../src/reducers/wall';
import { POST_TYPES } from '../../src/postTypes';
import { aggregate, setSize } from '../../src/actions/wall';
import { expect } from 'chai';

describe('wall reducer', () => {

  function aggregateMultipleTimes(n, type) {
    var state;
    for (var i = 0; i < n; i++) {
      state = wall(state, aggregate({
        twp_source: type,
        text: 'hello ' + i
      }));
    }
    return state;
  }

  it('should be initialize with empty array ', () => {
    const result = wall(undefined, {
      type: 'UNKNOW'
    });
    POST_TYPES.forEach(type => {
      expect(result[type].items).to.be.deep.equal([]);
    });
    expect(result.all.items).to.be.deep.equal([]);
  });

  it('should aggregate one item', () => {
    const result = wall(undefined, aggregate({
      text: 'hello',
      twp_source: 'twitter'
    }));
    expect(result.all.aggregated).to.be.equal(1);
    expect(result.twitter.aggregated).to.be.equal(1);
    expect(result.facebook.aggregated).to.be.equal(0);
    expect(result.all.items).to.be.deep.equal([
      {
        text: 'hello',
        twp_source: 'twitter'
      }
    ]);
    expect(result.twitter.items).to.be.deep.equal([
      {
        text: 'hello',
        twp_source: 'twitter'
      }
    ]);
    expect(result.facebook.items).to.be.deep.equal([]);
    expect(result.instagram.items).to.be.deep.equal([]);
  });

  it('should increase aggregate counter', () => {
    var result = wall(undefined, aggregate({
      twp_source: 'instagram'
    }));
    expect(result.all.aggregated).to.be.equal(1);
    for (var i = 2; i < 30; i++) {
      result = wall(result, aggregate({
        twp_source: 'twitter'
      }));
      expect(result.all.aggregated).to.be.equal(i);
      expect(result.twitter.aggregated).to.be.equal(i - 1);
      expect(result.facebook.aggregated).to.be.equal(0);
      expect(result.instagram.aggregated).to.be.equal(1);
    }
  });

  it('should set size', () => {
    const result = wall(undefined, setSize(5));
    expect(result.size).to.be.equal(5);
    POST_TYPES.forEach(type => {
      expect(result[type].aggregated).to.be.equal(0);
    });
  });

  POST_TYPES.forEach(type => {
    describe(type, () => {

      it('should aggregate over the limit', () => {
        const state = aggregateMultipleTimes(15, type);
        expect(state[type].items).to.have.length(10);
        expect(state[type].items[0].text).to.be.equal('hello 5');
        expect(state[type].items[9].text).to.be.equal('hello 14');
        expect(state.all.items).to.have.length(10);
        expect(state.all.items[0].text).to.be.equal('hello 5');
        expect(state.all.items[9].text).to.be.equal('hello 14');
      });

      it('should aggregate one item', () => {
        const result = wall(undefined, aggregate({
          twp_source: type,
          text: 'hello'
        }));
        expect(result[type].aggregated).to.be.equal(1);
        expect(result[type].items[0].text).to.be.equal('hello');
        expect(result.all.aggregated).to.be.equal(1);
        expect(result.all.items[0].text).to.be.equal('hello');
      });

      it('should aggregate 2 items', () => {
        const result = aggregateMultipleTimes(2, type);
        expect(result[type].aggregated).to.be.equal(2);
        expect(result[type].items[0].text).to.be.equal('hello 0');
        expect(result[type].items[1].text).to.be.equal('hello 1');
        expect(result.all.aggregated).to.be.equal(2);
        expect(result.all.items[0].text).to.be.equal('hello 0');
        expect(result.all.items[1].text).to.be.equal('hello 1');
      });

      it('should truncate when set size inferior to the current state', () => {
        const state = wall(aggregateMultipleTimes(10, type), setSize(5));
        expect(state[type].aggregated).to.be.equal(10);
        expect(state[type].items).to.have.lengthOf(5);
        expect(state[type].items[0].text).to.be.equal('hello 5');
        expect(state[type].items[4].text).to.be.equal('hello 9');
        expect(state.all.aggregated).to.be.equal(10);
        expect(state.all.items).to.have.lengthOf(5);
        expect(state.all.items[0].text).to.be.equal('hello 5');
        expect(state.all.items[4].text).to.be.equal('hello 9');
      });

    });
  });

});
