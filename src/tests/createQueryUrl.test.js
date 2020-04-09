const createQueryUrl = require('../createQueryUrl');

describe.skip('Constructs a valid Google Distance Matrix API query string', () => {
  let key = 'fakeKeyOnlyForTestingPurposesPleaseDoNotUseItForMakingRealApiCalls';

  test('Returns a string', () => {
    const output = createQueryUrl(['anything', 'foo'], ['anything', 'qwe'], key);
    expect(typeof output).toBe('string');
  });

  test('Returns null when parameters are not arrays', () => {
    expect(createQueryUrl('Test', ['1', '2'], key)).toBeNull();
    expect(createQueryUrl(123, 'I am not an array')).toBeNull();
  });

  let origin = [
    { desc: 'place1', placeId: 'RYAA6w' },
  ];
  let dest = [
    { desc: 'place5', placeId: 'ChIJLz' },
    { desc: 'place4', placeId: 'UYRKaK' },
    { desc: 'place3', placeId: '1MVXCk' },
    { desc: 'place2', placeId: 'CysYtg' },
  ];
  let response = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:RYAA6w&destinations=place_id:ChIJLz|place_id:UYRKaK|place_id:1MVXCk|place_id:CysYtg&departure_time=now&key=fakeKeyOnlyForTestingPurposesPleaseDoNotUseItForMakingRealApiCalls';

  test('Builds an url given the arrays of 1 origin / 4 destinations', () => {
    expect(createQueryUrl(origin, dest, key)).toBe(response);
  });

  origin = [
    { desc: 'place5', placeId: 'ChIJLz' },
    { desc: 'place4', placeId: 'UYRKaK' },
    { desc: 'place3', placeId: '1MVXCk' },
    { desc: 'place2', placeId: 'CysYtg' },
  ];
  dest = [
    { desc: 'place1', placeId: 'RYAA6w' },
  ];
  key = 'fakeKeyOnlyForTestingPurposesPleaseDoNotUseItForMakingRealApiCalls2';
  response = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:ChIJLz|place_id:UYRKaK|place_id:1MVXCk|place_id:CysYtg&destinations=place_id:RYAA6w&departure_time=now&key=fakeKeyOnlyForTestingPurposesPleaseDoNotUseItForMakingRealApiCalls2';

  test('Builds an url given the arrays of 4 origins / 1 destination', () => {
    expect(createQueryUrl(origin, dest, key)).toBe(response);
  });
});
