import getDiff from '../getDiff.js';

describe('getDiff', () => {
  test('prop is deleted', () => {
    const diff = getDiff({ name: 'Max', age: 20 }, { age: 20 });

    const expectedDiff = '{\n    age: 20\n  - name: Max\n}';

    expect(diff).toBe(expectedDiff);
  });
});
