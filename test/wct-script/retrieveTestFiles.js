const fs = require('fs');
const path = require('path');
const watcher = require('./watcher');

const testRegex = /(_|\.)test.html/gi;

const testSuiteDir = 'components';
const testSuitePath = path.join(__dirname, '..', testSuiteDir);

function retrieveTestFiles () {
  const filesList = fs.readdirSync(testSuitePath)
    .filter(fileName => fileName.match(testRegex))
    .map(fileName => `${testSuiteDir}/${fileName}`);

  writeToFile(JSON.stringify(filesList));
}

function writeToFile (string) {
  const pattern = '[FILES]';
  const template = `function getTestFiles () { return ${pattern} }`;

  const output = template.replace(pattern, string);

  fs.writeFileSync(__dirname + `/getTestFiles.js`, output);
}

retrieveTestFiles();

function shouldWatch () {
  return process.argv.find(arg => arg === '--watch');
}

if (shouldWatch()) {
  watcher(testSuitePath, { cb: retrieveTestFiles });
}
