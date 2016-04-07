import wall from '../../src/reducers/wall';
import { aggregate, setSize } from '../../src/actions/wall';
import { expect } from 'chai';

describe('wall reducer', () => {


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
    var state;
    for(var i=0; i<15; i++){
      state = wall(state, aggregate({
        text: 'hello ' + i
      }));
    }
    expect(state.items).to.has.length(10);
    expect(state.items[0].text).to.be.equal('hello 5');
    expect(state.items[9].text).to.be.equal('hello 14');
  });

});
