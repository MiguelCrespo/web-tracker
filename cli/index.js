#!/usr/bin/env node

/**
 * Module dependencies.
 */

const bluebird = require('bluebird');
const fs = bluebird.promisifyAll(require('fs'));
const program = require('commander');
const glob = bluebird.promisify(require('glob'));

const getConfig = require('./get-config');

program
  .command('report')
  .description(
    'This command will report data to your firebase backend, the following commands are optional if you use declare the file .web-reporter.json'
  )
  .option(
    '-g, --glob ',
    'What files do you want to report, express it as a glob'
  )
  .option(
    '--firebase-api-key ',
    'Define the Firebase api key to be used in the command'
  )
  .option('--firebase-db-url', 'Define the url of your Firebase database')
  .action(async () => {
    try {
      const config = getConfig('./web-reporter.json');

      console.log('config parsed: ', config);

      const filesToAnalyze = await glob(config.glob);

      const stats = await bluebird.all(
        filesToAnalyze.map(file => fs.statAsync(file))
      );

      console.log('Config: ', filesToAnalyze);
      console.log('Stats: ', stats);
      return 0;
    } catch (e) {
      console.error('There was an error: ', e);
    }
  });

program.parse(process.argv);
