const fs = require('fs');
const path = require('path');
const watcher = require('./watcher');

const testRegex = /(_|\.)test.html/gi;

const testSuiteDir = 'e2e';

function findTestFilesIn (directoryName, filesList = []) {
  const directoryPath = path.join(__dirname, '..', directoryName);
  return fs.readdirSync(directoryPath)
    .reduce((list, fileName) => {
      const stat = fs.statSync(path.join(directoryPath, fileName));
      const fileNameInRelativePath = `${directoryName}/${fileName}`;
      if (stat.isDirectory()) {
        return findTestFilesIn(fileNameInRelativePath, filesList);
      } else {
        list.push(fileNameInRelativePath);
        return list;
      }
    }, filesList)
    .filter(fileName => fileName.match(testRegex));
}

function retrieveTestFiles () {
  const filesList = findTestFilesIn(testSuiteDir);

  writeToFile(JSON.stringify(filesList));
}

function writeToFile (string) {
  const pattern = '[FILES]';
  const template = `function getTestFiles () { return ${pattern} }`;

  const output = template.replace(pattern, string);

  fs.writeFileSync(path.join(__dirname, '/getTestFiles.js'), output);
}

retrieveTestFiles();

function shouldWatch () {
  return process.argv.find(arg => arg === '--watch');
}

if (shouldWatch()) {
  const testSuitePath = path.join(__dirname, '..', testSuiteDir);
  watcher(testSuitePath, { cb: retrieveTestFiles });
}
