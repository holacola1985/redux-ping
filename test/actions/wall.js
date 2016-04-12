import { expect } from 'chai';
import { createStore } from 'redux';
import reducer from '../../src/reducers/wall';
import { aggregate, setSize } from '../../src/actions/wall';
import selectors from '../../src/selectors/wall';
//import { POST_TYPES } from '../../src/postTypes';

describe('scenario context', () => {

  var store;

  function generateTweet(text) {
    return {
      text: text
    };
  }

  function expectStateToBeEqual(s, value) {
    expect(selectors.all(s.getState()).map(item => item.text)).to.be.deep.equal(value);
  }

  it('should create store', () => {
    store = createStore(reducer);
    expect(store).to.have.property('dispatch');
    expect(store.getState().all.aggregated).to.be.equal(0);
  });

  it('should set size', () => {
    expect(store.getState().size).to.be.equal(10);
    store.dispatch(setSize(4));
    expect(store.getState().size).to.be.equal(4);
    expect(store.getState().all.aggregated).to.be.equal(0);
  });

  it('should add posts', () => {
    store.dispatch(aggregate(generateTweet(1)));
    expect(store.getState().all.items).to.have.lengthOf(1);
    expect(store.getState().all.aggregated).to.be.equal(1);
    store.dispatch(aggregate(generateTweet(2)));
    expect(store.getState().all.items).to.have.lengthOf(2);
  });

  it('should reach the limit', () => {
    store.dispatch(aggregate(generateTweet(3)));
    store.dispatch(aggregate(generateTweet(4)));
    expect(store.getState().all.items).to.have.lengthOf(4);
    expectStateToBeEqual(store, [1, 2, 3, 4]);
    store.dispatch(aggregate(generateTweet(5)));
    store.dispatch(aggregate(generateTweet(6)));
    store.dispatch(aggregate(generateTweet(7)));
    expect(store.getState().all.items).to.have.lengthOf(4);
  });

  it('should get selector', () => {
    expectStateToBeEqual(store, [5, 6, 7, 4]);
  });

});
