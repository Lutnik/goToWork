const initSchedule = require('../initSchedule');

describe.skip('Timer runs properly from 0..23 again and again to limit API calls', () => {
  const hours = populateHoursArray(); // eslint-disable-line no-use-before-define
  const timer = initSchedule(5);

  test.each(hours)('Call at %i on Monday', (hour, expected) => {
    expect(timer(hour, 1)).toEqual(expected);
  });
});

describe.skip('Timer runs only Mon-Fri', () => {
  const days = populateDaysArray(); // eslint-disable-line no-use-before-define
  let timer = 0;
  beforeEach(() => {
    timer = initSchedule(8);
  });

  test.each(days)('Call at 8 a.m. on %i-th day', (day, expected) => {
    expect(timer(8, day)).toEqual(expected);
  });
});

function populateHoursArray() {
  return [
    [5, { toWork: false, fromWork: false }],
    [5, { toWork: false, fromWork: false }],
    [5, { toWork: false, fromWork: false }],
    [5, { toWork: false, fromWork: false }],
    [6, { toWork: true, fromWork: true }],
    [6, { toWork: true, fromWork: false }],
    [6, { toWork: true, fromWork: false }],
    [7, { toWork: true, fromWork: true }],
    [7, { toWork: true, fromWork: false }],
    [7, { toWork: true, fromWork: false }],
    [7, { toWork: true, fromWork: false }],
    [7, { toWork: true, fromWork: false }],
    [8, { toWork: true, fromWork: true }],
    [8, { toWork: true, fromWork: false }],
    [8, { toWork: true, fromWork: false }],
    [8, { toWork: true, fromWork: false }],
    [9, { toWork: true, fromWork: true }],
    [9, { toWork: true, fromWork: false }],
    [9, { toWork: true, fromWork: false }],
    [9, { toWork: true, fromWork: false }],
    [10, { toWork: true, fromWork: true }],
    [10, { toWork: false, fromWork: false }],
    [10, { toWork: false, fromWork: false }],
    [10, { toWork: false, fromWork: false }],
    [11, { toWork: true, fromWork: true }],
    [11, { toWork: false, fromWork: false }],
    [11, { toWork: false, fromWork: false }],
    [11, { toWork: false, fromWork: false }],
    [12, { toWork: true, fromWork: true }],
    [12, { toWork: false, fromWork: false }],
    [12, { toWork: false, fromWork: false }],
    [12, { toWork: false, fromWork: false }],
    [13, { toWork: true, fromWork: true }],
    [13, { toWork: false, fromWork: false }],
    [13, { toWork: false, fromWork: false }],
    [13, { toWork: false, fromWork: false }],
    [14, { toWork: true, fromWork: true }],
    [14, { toWork: false, fromWork: false }],
    [14, { toWork: false, fromWork: false }],
    [14, { toWork: false, fromWork: false }],
    [15, { toWork: true, fromWork: true }],
    [15, { toWork: false, fromWork: true }],
    [15, { toWork: false, fromWork: true }],
    [15, { toWork: false, fromWork: true }],
    [16, { toWork: true, fromWork: true }],
    [16, { toWork: false, fromWork: true }],
    [16, { toWork: false, fromWork: true }],
    [16, { toWork: false, fromWork: true }],
    [17, { toWork: true, fromWork: true }],
    [17, { toWork: false, fromWork: true }],
    [17, { toWork: false, fromWork: true }],
    [17, { toWork: false, fromWork: true }],
    [18, { toWork: true, fromWork: true }],
    [18, { toWork: false, fromWork: true }],
    [18, { toWork: false, fromWork: true }],
    [18, { toWork: false, fromWork: true }],
    [19, { toWork: true, fromWork: true }],
    [19, { toWork: false, fromWork: true }],
    [19, { toWork: false, fromWork: true }],
    [19, { toWork: false, fromWork: true }],
    [19, { toWork: false, fromWork: true }],
    [20, { toWork: false, fromWork: false }],
    [20, { toWork: false, fromWork: false }],
    [20, { toWork: false, fromWork: false }],
    [20, { toWork: false, fromWork: false }],
    [21, { toWork: false, fromWork: false }],
    [21, { toWork: false, fromWork: false }],
    [21, { toWork: false, fromWork: false }],
    [21, { toWork: false, fromWork: false }],
    [22, { toWork: false, fromWork: false }],
    [22, { toWork: false, fromWork: false }],
    [22, { toWork: false, fromWork: false }],
    [22, { toWork: false, fromWork: false }],
    [23, { toWork: false, fromWork: false }],
    [23, { toWork: false, fromWork: false }],
    [23, { toWork: false, fromWork: false }],
    [23, { toWork: false, fromWork: false }],
    [0, { toWork: false, fromWork: false }],
    [0, { toWork: false, fromWork: false }],
    [0, { toWork: false, fromWork: false }],
    [0, { toWork: false, fromWork: false }],
    [1, { toWork: false, fromWork: false }],
    [1, { toWork: false, fromWork: false }],
    [1, { toWork: false, fromWork: false }],
    [1, { toWork: false, fromWork: false }],
    [2, { toWork: false, fromWork: false }],
    [2, { toWork: false, fromWork: false }],
    [2, { toWork: false, fromWork: false }],
    [2, { toWork: false, fromWork: false }],
    [3, { toWork: false, fromWork: false }],
    [3, { toWork: false, fromWork: false }],
    [3, { toWork: false, fromWork: false }],
    [3, { toWork: false, fromWork: false }],
    [4, { toWork: false, fromWork: false }],
    [4, { toWork: false, fromWork: false }],
    [4, { toWork: false, fromWork: false }],
    [4, { toWork: false, fromWork: false }],
    [5, { toWork: false, fromWork: false }],
    [5, { toWork: false, fromWork: false }],
    [5, { toWork: false, fromWork: false }],
    [5, { toWork: false, fromWork: false }],
    [6, { toWork: true, fromWork: true }],
    [6, { toWork: true, fromWork: false }],
  ];
}

function populateDaysArray() {
  return [
    [0, { toWork: false, fromWork: false }],
    [1, { toWork: true, fromWork: true }],
    [2, { toWork: true, fromWork: true }],
    [3, { toWork: true, fromWork: true }],
    [4, { toWork: true, fromWork: true }],
    [5, { toWork: true, fromWork: true }],
    [6, { toWork: false, fromWork: false }],
  ];
}
