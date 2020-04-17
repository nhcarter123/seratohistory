const { getDefaultSeratoPath, getHistory } = require('seratohistory');
const { keys } = require('lodash');

test('Path must be string', () => {
  expect(getDefaultSeratoPath().length).toBeGreaterThan(0);
});
test('Retrieve history', async() => {
  const seratoPath = getDefaultSeratoPath();

  const history = await getHistory(seratoPath);

  expect(keys(history).length).toBeGreaterThan(0);
});
