import wall from '../../src/reducers/wall';
import {expect} from 'chai';

describe('wall reducer', () => {

  it('should be initialize with empty array ', () => {
    expect(wall(undefined, {
      type: 'UNKNOW'  
    })).to.be.deep.equal([]);
  });

});
