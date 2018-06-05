const path = require('path');
const fs = require('fs');
const sass = require('node-sass');

const watcher = require('../watcher');

const STYLES_DIRECTORY = path.join(__dirname, '../../src/styles');
const TARGET_FILE_NAME = 'main';
const TEMPLATE_PATH = path.join(__dirname, './polymer-style-template.js');
const INPUT_FILE = path.join(STYLES_DIRECTORY, `${TARGET_FILE_NAME}.scss`);
const OUTPUT_FILE = path.join(STYLES_DIRECTORY, `${TARGET_FILE_NAME}.js`);

function convertSassToCss () {
  const CSSOutput = sass.renderSync({
    file: INPUT_FILE
  });
  const cssString = CSSOutput.css.toString();
  writeToTemplate(cssString);
}

function getTemplateFile () {
  return fs.readFileSync(TEMPLATE_PATH).toString();
}

function writeToTemplate (cssString) {
  const templateFile = getTemplateFile();
  const templateDelimitor = /<%\s*content\s*%>/;
  const cssContent = templateFile.replace(templateDelimitor, cssString);
  fs.writeFileSync(OUTPUT_FILE, cssContent);
}

function shouldWatch () {
  return process.argv.find(arg => arg === '--watch');
}

convertSassToCss();

if (shouldWatch()) {
  watcher(STYLES_DIRECTORY, { ignoreFiles: [OUTPUT_FILE], cb: convertSassToCss});
}
