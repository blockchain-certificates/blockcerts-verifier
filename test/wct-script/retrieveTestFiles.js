const fs = require('fs');

const testRegex = /(_|\.)test.html/gi;

const testSuiteDir = 'components';

function retrieveTestFiles () {
  const filesList = fs.readdirSync(testSuiteDir)
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
