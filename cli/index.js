#!/usr/bin/env node

/**
 * Module dependencies.
 */

const bluebird = require('bluebird');
const fs = bluebird.promisifyAll(require('fs'));
const program = require('commander');
const glob = bluebird.promisify(require('glob'));

program
  .command('report')
  .description('This command will report data to your firebase backend')
  .action(async () => {
    try {
      const config = JSON.parse(
        fs.readFileSync('./web-reporter.json', 'utf-8')
      );

      if (!config.glob) {
        console.error('Ups you have to specify the glob of your files');
        return;
      }

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
