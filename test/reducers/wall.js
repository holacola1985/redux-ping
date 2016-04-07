import wall from '../../src/reducers/wall';
import {aggregate} from '../../src/actions/wall';
import {expect} from 'chai';

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

});
