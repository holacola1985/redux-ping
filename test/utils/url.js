import {expect} from 'chai';
import {wall} from '../../src/utils/url';

describe('utils url', () => {

  describe('wall', () => {
    it('should get wall url', () => {
      const result = 'https://www.tweetping.net/data/stream/42/wall/';
      expect(wall(42)).to.be.equal(result);
    });

    it('should setup size', () => {
      const result = 'https://www.tweetping.net/data/stream/42/wall/?size=50';
      expect(wall(42, {
        size: 50 
      })).to.be.equal(result);
    });

    it('should setup pathname', () => {
      const result = 'https://www.tweetping.net/custom_path.json';
      expect(wall(42, {
        pathname: 'custom_path.json' 
      })).to.be.equal(result);
    });

    it('should filter on type', () => {
      const result = 'https://www.tweetping.net/data/stream/42/wall/twitter';
      expect(wall(42, {
        type: 'twitter' 
      })).to.be.equal(result);
    });

    it('should change the host', () => {
      const result = 'https://localhost:3000/data/stream/42/wall/';
      expect(wall(42, {
        hostname: 'localhost',
        port: 3000
      })).to.be.equal(result);
    });
  });

});
