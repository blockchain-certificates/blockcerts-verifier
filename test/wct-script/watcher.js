var watch = require('watch');

function isFileIgnored (ignoreFiles, file) {
  return !ignoreFiles.find(f => f === file);
}

function log (verbose, message) {
  if (!verbose) {
    return;
  }
  console.log(message);
}

/**
 * watcher
 *
 * @param {string} directory: absolute path of directory to watch
 * @param {object} config
 *    - ignoreFiles {string[]} list of absolute paths to ignore in the watcher events
 *    - cb {func} callback to execute on the different events
 *    - verbose {bool} whether or not to display console logs
 * @returns {string}
 */
function watcher (directory, { ignoreFiles = [], cb = () => {}, verbose = true }) {
  watch.createMonitor(directory, function (monitor) {
    monitor.on('created', function (f) {
      log(verbose, `file created: ${f}`);
      if (isFileIgnored(ignoreFiles, f)) {
        cb();
      }
    });
    monitor.on('changed', function (f) {
      log(verbose, `file changed: ${f}`);
      if (isFileIgnored(ignoreFiles, f)) {
        cb();
      } else {
        log(verbose, `file: ${f} did not trigger any change`);
      }
    });
    monitor.on('removed', function (f) {
      log(verbose, `file deleted: ${f}`);
      if (isFileIgnored(ignoreFiles, f)) {
        cb();
      }
    });
  });
}

module.exports = watcher;
