import wall from '../../src/reducers/wall';
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
    expect(wall(undefined, {
      type: 'UNKNOW'
    }).all.items).to.be.deep.equal([]);
  });

  it('should aggregate one item', () => {
    const result = wall(undefined, aggregate({
      text: 'hello'
    }));
    expect(result.all.aggregated).to.be.equal(1);
    expect(result.all.items).to.be.deep.equal([
      {
        text: 'hello'
      }
    ]);
  });

  it('should aggregate 2 items', () => {
    const result = aggregateMultipleTimes(2);
    expect(result.all.aggregated).to.be.equal(2);
    expect(result.all.items[0].text).to.be.equal('hello 0');
    expect(result.all.items[1].text).to.be.equal('hello 1');
  });

  it('should set size', () => {
    expect(wall(undefined, setSize(5)).size).to.be.equal(5);
  });

  it('should aggregate over the limit', () => {
    const state = aggregateMultipleTimes(15);
    expect(state.all.items).to.have.length(10);
    expect(state.all.items[0].text).to.be.equal('hello 5');
    expect(state.all.items[9].text).to.be.equal('hello 14');
  });

  it('should truncate when set size inferior to the current state', () => {
    const state = wall(aggregateMultipleTimes(10), setSize(5));
    expect(state.all.items).to.have.length(5);
    expect(state.all.items[0].text).to.be.equal('hello 5');
    expect(state.all.items[4].text).to.be.equal('hello 9');
  });

  ['twitter', 'facebook'].forEach(type => {
    describe(type, () => {

      it('should aggregate one item', () => {
        const result = wall(undefined, aggregate({
          twp_source: type,
          text: 'hello'
        }));
        expect(result[type].aggregated).to.be.equal(1);
        expect(result[type].items[0].text).to.be.equal('hello');
      });

      it('should aggregate 2 items', () => {
        const result = aggregateMultipleTimes(2, type);
        expect(result[type].aggregated).to.be.equal(2);
        expect(result[type].items[0].text).to.be.equal('hello 0');
        expect(result[type].items[1].text).to.be.equal('hello 1');
      });
    });
  });

});
