const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join('/home/n/nomokoiw', '.cache', 'puppeteer'),
  skipDownload: true,
};
