import { program } from 'commander';
import path from 'path';
import fs from 'fs';

import getDiff from './getDiff.js';

program
  .arguments('<filename1> <filename2>')
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .option('-h, --help', 'display help for command')
  .option('-f, --format <type>', 'output format')
  .version('0.0.1')
  .action((filename1, filename2) => {
    if (!filename1.endsWith('.json') || !filename2.endsWith('.json')) {
      throw new Error('Files should be in JSON format!');
    }

    const fullName1 = path.resolve(filename1);
    const fullName2 = path.resolve(filename2);

    const object1 = JSON.parse(fs.readFileSync(fullName1));
    const object2 = JSON.parse(fs.readFileSync(fullName2));

    const diff = getDiff(object1, object2);

    console.log(diff);
  });

program.parse();

if (program.opts().help) {
  program.help();
}
