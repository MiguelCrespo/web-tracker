#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');

program
  .command('report')
  .parse(process.argv).action((type, args) => {
    console.log('Type: ', type);
    console.log('Args: ', args);
  });