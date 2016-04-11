import reducer from '../../src/reducers/wall';
import { aggregate } from '../../src/actions/wall';
import selectors from '../../src/selectors/wall';
import { expect } from 'chai';

const {all} = selectors;

describe('wall selectors', () => {
  function aggregateMultipleTimes(n, type) {
    var state;
    for (var i = 0; i < n; i++) {
      state = reducer(state, aggregate({
        twp_source: type,
        text: 'hello ' + i
      }));
    }
    return state;
  }

  describe('all', () => {

    it('should cache result', () => {
      const state = aggregateMultipleTimes(11);
      const projection1 = all(state);
      const projection2 = all(state);
      expect(projection1 === projection2).to.be.true;
    });

    it('should rewrite first item', () => {
      const state = aggregateMultipleTimes(11);
      expect(all(state)[0].text).to.be.equal('hello 10');
    });

    it('should rewrite two item', () => {
      const state = aggregateMultipleTimes(12);
      const projection = all(state);
      expect(projection[0].text).to.be.equal('hello 10');
      expect(projection[1].text).to.be.equal('hello 11');
    });

    it('should rewrite the full array 2 time', () => {
      const state = aggregateMultipleTimes(22);
      const projection = all(state);
      expect(projection[0].text).to.be.equal('hello 20');
      expect(projection[1].text).to.be.equal('hello 21');
    });

  });

  ['twitter', 'facebook', 'instagram'].forEach(type => {
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
