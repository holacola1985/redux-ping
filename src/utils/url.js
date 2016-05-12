import { format } from 'url';
import { join } from 'path';

const defaultOptions = {
  protocol: 'https',
  hostname: 'www.tweetping.net'
};

export function wall(streamId, options = {}) {
  const {size, type, port} = options;
  const urlFormatOptions = {
    hostname: options.hostname || defaultOptions.hostname,
    protocol: options.protocol || defaultOptions.protocol,
    pathname: options.pathname || join('data/stream', streamId.toString(), 'wall/', type || ''),
    port
  };

  if (size) {
    urlFormatOptions.query = {
      size
    };
  }

  return format(urlFormatOptions);
}

export function geoBoundingBox(streamId, options = {}) {
  const {size, type, port, condensed, bbox} = options;
  const urlFormatOptions = {
    hostname: options.hostname || defaultOptions.hostname,
    protocol: options.protocol || defaultOptions.protocol,
    pathname: options.pathname || join(
        'data/stream',
        streamId.toString(),
        'geo',
        (bbox || [-180, -90, 180, 90]).join(),
        type || '/'),
    port
  };

  if (size) {
    urlFormatOptions.query = {
      size
    };
  }

  if (condensed) {
    urlFormatOptions.query = {
      condensed: 1
    };
  }

  return format(urlFormatOptions);
}
