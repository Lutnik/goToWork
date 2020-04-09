const mongoose = require('mongoose');
const saveData = require('../saveData');

describe.skip('Creates mongodb documents and saves them', () => {
  const [badData, validData1, validData2] = prepareData(); // eslint-disable-line no-use-before-define
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { // eslint-disable-line no-underscore-dangle
      useNewUrlParser: true,
      useCreateIndex: true,
    }, (err) => (err ? process.exit(1) : ''));
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('Rejects when more than one of destinations and origins with an error', () => {
    expect.assertions(1);
    return expect(saveData(badData)).rejects.toThrow();
  });
  test('Creates db models and saves them successfully (1 origin, 4 dest)', async () => {
    expect.assertions(3);
    const response = await saveData(validData2);
    expect(response).toBeDefined();
    expect(Array.isArray(response)).toBe(true);
    expect(response.length).toBe(4);
  });
  test('Saved document contains all expected fields (1 origin, 4 dest)', async () => {
    expect.assertions(20);
    const response = await saveData(validData2);
    response.forEach((res) => {
      expect(res).toHaveProperty('_id');
      expect(res).toHaveProperty('origin');
      expect(res).toHaveProperty('destination');
      expect(res).toHaveProperty('durationTraffic');
      expect(res).toHaveProperty('timestamp');
    });
  });
  test('Creates db models and saves them successfully (4 origins, 1 dest)', async () => {
    expect.assertions(3);
    const response = await saveData(validData1);
    expect(response).toBeDefined();
    expect(Array.isArray(response)).toBe(true);
    expect(response.length).toBe(4);
  });
  test('Saved document contains all expected fields (4 origins, 1 dest)', async () => {
    expect.assertions(20);
    const response = await saveData(validData1);
    response.forEach((res) => {
      expect(res).toHaveProperty('_id');
      expect(res).toHaveProperty('origin');
      expect(res).toHaveProperty('destination');
      expect(res).toHaveProperty('durationTraffic');
      expect(res).toHaveProperty('timestamp');
    });
  });
});

function prepareData() {
  return [
    // bad data
    {
      destination_addresses: ['place1', 'place2', 'place3'],
      origin_addresses: ['place4', 'place5'],
    },
    // good data 1 ================================
    {
      destination_addresses: [
        'place1',
      ],
      origin_addresses: [
        'place5',
        'place4',
        'place3',
        'place2',
      ],
      rows: [
        {
          elements: [
            {
              distance: {
                text: '9.2 km',
                value: 9235,
              },
              duration: {
                text: '15 mins',
                value: 929,
              },
              duration_in_traffic: {
                text: '14 mins',
                value: 820,
              },
              status: 'OK',
            },
          ],
        },
        {
          elements: [
            {
              distance: {
                text: '10.8 km',
                value: 10764,
              },
              duration: {
                text: '20 mins',
                value: 1199,
              },
              duration_in_traffic: {
                text: '18 mins',
                value: 1108,
              },
              status: 'OK',
            },
          ],
        },
        {
          elements: [
            {
              distance: {
                text: '19.1 km',
                value: 19069,
              },
              duration: {
                text: '30 mins',
                value: 1788,
              },
              duration_in_traffic: {
                text: '28 mins',
                value: 1655,
              },
              status: 'OK',
            },
          ],
        },
        {
          elements: [
            {
              distance: {
                text: '29.8 km',
                value: 29780,
              },
              duration: {
                text: '32 mins',
                value: 1902,
              },
              duration_in_traffic: {
                text: '29 mins',
                value: 1744,
              },
              status: 'OK',
            },
          ],
        },
      ],
      status: 'OK',
    },
    // good data 2 =================================
    {
      destination_addresses: [
        'place5',
        'place4',
        'place3',
        'place2',
      ],
      origin_addresses: [
        'place1',
      ],
      rows: [
        {
          elements: [
            {
              distance: {
                text: '10.5 km',
                value: 10549,
              },
              duration: {
                text: '20 mins',
                value: 1177,
              },
              duration_in_traffic: {
                text: '18 mins',
                value: 1066,
              },
              status: 'OK',
            },
            {
              distance: {
                text: '10.8 km',
                value: 10835,
              },
              duration: {
                text: '21 mins',
                value: 1244,
              },
              duration_in_traffic: {
                text: '19 mins',
                value: 1133,
              },
              status: 'OK',
            },
            {
              distance: {
                text: '20.7 km',
                value: 20745,
              },
              duration: {
                text: '28 mins',
                value: 1692,
              },
              duration_in_traffic: {
                text: '25 mins',
                value: 1495,
              },
              status: 'OK',
            },
            {
              distance: {
                text: '33.1 km',
                value: 33115,
              },
              duration: {
                text: '34 mins',
                value: 2041,
              },
              duration_in_traffic: {
                text: '30 mins',
                value: 1806,
              },
              status: 'OK',
            },
          ],
        },
      ],
      status: 'OK',
    },
  ];
}
