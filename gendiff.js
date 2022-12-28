import { program } from 'commander';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';

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

    const map = new Map();

    Object.entries(object1).forEach(([key, value]) => {
      if (!Object.hasOwn(object2, key)) {
        map.set(`  - ${key}`, value);
      } else {
        const value2 = object2[key];

        if (value === value2) {
          map.set(`    ${key}`, value);
        } else {
          map.set(`  - ${key}`, value);
          map.set(`  + ${key}`, value2);
        }
      }
    });

    Object.entries(object2).forEach(([key, value]) => {
      if (!Object.hasOwn(object1, key)) {
        map.set(`  + ${key}`, value);
      }
    });

    const sortedProps = _.sortBy(Array.from(map), [
      ([key]) => _.trimStart(key, ' +-'),
    ]);

    console.log('{');

    sortedProps.forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });

    console.log('}');
  });

program.parse();

if (program.opts().help) {
  program.help();
}
