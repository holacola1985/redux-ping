import wall from '../../src/reducers/wall';
import { aggregate, setSize } from '../../src/actions/wall';
import { expect } from 'chai';

describe('wall reducer', () => {

  function aggregateMultipleTimes(n){
    var state;
    for(var i=0; i<n; i++){
      state = wall(state, aggregate({
        text: 'hello ' + i
      }));
    }
    return state;
  }

  it('should be initialize with empty array ', () => {
    expect(wall(undefined, {
      type: 'UNKNOW'
    })).to.be.deep.equal({
      size: 10,
      items: []
    });
  });

  it('should aggregate one item', () => {
    expect(wall(undefined, aggregate({
      text: 'hello'
    })).items).to.be.deep.equal([
      {
        text: 'hello'
      }
    ]);
  });

  it('should aggregate 2 items', () => {
    const state1 = wall(undefined, aggregate({
      text: 'hello1'
    }));
    expect(wall(state1, aggregate({
      text: 'hello2'
    })).items).to.be.deep.equal([
      {
        text: 'hello1'
      },
      {
        text: 'hello2'
      }
    ]);
  });

  it('should set size', () => {
    expect(wall(undefined, setSize(5)).size).to.be.equal(5);
  });

  it('should aggregate over the limit', () => {
    const state = aggregateMultipleTimes(15);
    expect(state.items).to.have.length(10);
    expect(state.items[0].text).to.be.equal('hello 5');
    expect(state.items[9].text).to.be.equal('hello 14');
  });

  it('should truncate when set size inferior to the current state', () => {
    const state = wall(aggregateMultipleTimes(10), setSize(5));
    expect(state.items).to.have.length(5);
    expect(state.items[0].text).to.be.equal('hello 5');
    expect(state.items[4].text).to.be.equal('hello 9');
  });

});
