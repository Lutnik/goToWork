const fetchMock = require('fetch-mock-jest');
const fetchData = require('../fetchData');

const url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:RYAA6w&destinations=place_id:ChIJLz|place_id:UYRKaK|place_id:1MVXCk|place_id:CysYtg&departure_time=now&key=fakeKeyOnlyForTestingPurposesPleaseDoNotUseItForMakingRealApiCalls';
describe.skip('Gets data from Google Distance Matrix API', () => {
  fetchMock.get(url,
    {
      destination_addresses: [],
      origin_addresses: [],
      rows: [{
        elements: [],
      }],
    });
  test('If null received, a Promise is rejected with an error', () => {
    expect.assertions(1);
    return expect(fetchData(null)).rejects.toThrow('Invalid destination data');
  });
  test('The data is an object', async () => {
    expect.assertions(1);
    expect(typeof await fetchData(url)).toBe('object');
  });

  test('Returns an object with destination_addresses property', async () => {
    expect.assertions(1);
    expect(await fetchData(url)).toHaveProperty('destination_addresses');
  });

  test('Returns an object with origin_addresses property', async () => {
    expect.assertions(1);
    expect(await fetchData(url)).toHaveProperty('origin_addresses');
  });

  test('Returns an object with rows object', async () => {
    expect.assertions(1);
    expect(await fetchData(url)).toHaveProperty('rows');
  });
});
