import _ from 'lodash';

const NEW_LINE = '\n';

export const getDiff = (object1, object2) => {
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

  let diff = '{';

  sortedProps.forEach(([key, value]) => {
    const propInfo = `${key}: ${value}`;

    diff = diff + NEW_LINE + propInfo;
  });

  diff = diff + NEW_LINE + '}';

  return diff;
};
