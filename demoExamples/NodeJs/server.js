#!/usr/bin/env node
const htmlToObject  = require('html-to-object-converter');

// Check if an HTML file path is provided as a command-line argument
if (process.argv.length < 3) {
  console.error('Usage: html-to-object <HTML file>');
  process.exit(1);
}

// Read the HTML file specified as a command-line argument
const filePath = process.argv[2];
const fs = require('fs');

try {
  const html = fs.readFileSync(filePath, 'utf8');
  const result = htmlToObject(html);
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error('Error reading or parsing the HTML file:', error);
  process.exit(1);
}
