import reducer from '../../src/reducers/wall';
import { aggregate } from '../../src/actions/wall';
import { staticPosition } from '../../src/selectors/wall';
import { expect } from 'chai';

describe('wall selectors', () => {
  function aggregateMultipleTimes(n) {
    var state;
    for (var i = 0; i < n; i++) {
      state = reducer(state, aggregate({
        text: 'hello ' + i
      }));
    }
    return state;
  }

  describe('staticPosition', () => {

    it('should cache result', () => {
      const state = aggregateMultipleTimes(11);
      const projection1 = staticPosition(state);
      const projection2 = staticPosition(state);
      expect(projection1 === projection2).to.be.true;
    });


    it('should rewrite first item', () => {
      const state = aggregateMultipleTimes(11);
      expect(state.items[9].text).to.be.equal('hello 10');
      expect(staticPosition(state)[0].text).to.be.equal('hello 10');
    });

    it('should rewrite two item', () => {
      const state = aggregateMultipleTimes(12);
      expect(state.items[9].text).to.be.equal('hello 11');
      const projection = staticPosition(state);
      expect(projection[0].text).to.be.equal('hello 10');
      expect(projection[1].text).to.be.equal('hello 11');
    });

    it('should rewrite all all the array 2 time', () => {
      const state = aggregateMultipleTimes(22);
      expect(state.items[9].text).to.be.equal('hello 21');
      const projection = staticPosition(state);
      expect(projection[0].text).to.be.equal('hello 20');
      expect(projection[1].text).to.be.equal('hello 21');
    });

  });

});
