import reducer from '../../src/reducers/wall';
import { POST_TYPES } from '../../src/postTypes';
import { aggregate } from '../../src/actions/wall';
import selectors from '../../src/selectors/wall';
import { expect } from 'chai';

const {all} = selectors;

describe('wall selectors', () => {
  function aggregateMultipleTimes(n, type) {
    var state;
    for (var i = 0; i < n; i++) {
      state = reducer(state, aggregate({
        _source: type,
        text: 'hello ' + i
      }));
    }
    return state;
  }

  function flatten(projection){
    return projection.map(item => item.text.replace('hello ', '')).join(',');
  }

  describe('all', () => {

    it('should cache result', () => {
      const state = aggregateMultipleTimes(11);
      const projection1 = all(state);
      const projection2 = all(state);
      expect(projection1 === projection2).to.be.true;
    });

    it('should add an item', () => {
      const state = aggregateMultipleTimes(1);
      const projection = all(state);
      expect(projection[0].text).to.be.equal('hello 0');
      expect(flatten(projection)).to.be.equal('0');
    });

    it('should add 2 items', () => {
      const state = aggregateMultipleTimes(2);
      const projection = all(state);
      expect(projection[0].text).to.be.equal('hello 0');
      expect(projection[1].text).to.be.equal('hello 1');
      expect(flatten(projection)).to.be.equal('0,1');
    });

    it('should add as many items as size', () => {
      const state = aggregateMultipleTimes(10);
      const projection = all(state);
      expect(projection[0].text).to.be.equal('hello 0');
      expect(projection[1].text).to.be.equal('hello 1');
      expect(projection[9].text).to.be.equal('hello 9');
      expect(flatten(projection)).to.be.equal('0,1,2,3,4,5,6,7,8,9');
    });

    it('should rewrite first item', () => {
      const state = aggregateMultipleTimes(11);
      const projection = all(state);
      expect(projection[0].text).to.be.equal('hello 10');
      expect(flatten(projection)).to.be.equal('10,1,2,3,4,5,6,7,8,9');
    });

    it('should rewrite two item', () => {
      const state = aggregateMultipleTimes(12);
      const projection = all(state);
      expect(projection[0].text).to.be.equal('hello 10');
      expect(projection[1].text).to.be.equal('hello 11');
      expect(projection).to.have.lengthOf(10);
      expect(flatten(projection)).to.be.equal('10,11,2,3,4,5,6,7,8,9');
    });

    it('should rewrite the full array 2 time', () => {
      const state = aggregateMultipleTimes(22);
      const projection = all(state);
      expect(projection).to.have.lengthOf(10);
      expect(projection[0].text).to.be.equal('hello 20');
      expect(projection[1].text).to.be.equal('hello 21');
      expect(flatten(projection)).to.be.equal('20,21,12,13,14,15,16,17,18,19');
    });

  });

  POST_TYPES.forEach(type => {
    describe(type, () => {
      it('should rewrite the full array for ' + type + ' 2 times', () => {
        const state = aggregateMultipleTimes(22, type);
        const projection = selectors[type](state);
        expect(projection[0].text).to.be.equal('hello 20');
        expect(projection[1].text).to.be.equal('hello 21');
      });
    });
  });

});
