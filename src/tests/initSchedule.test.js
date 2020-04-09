const initSchedule = require('../initSchedule');

describe('Timer runs properly from 0..23 again and again to limit API calls', () => {
  const hours = populateHoursArray(); // eslint-disable-line no-use-before-define

  test.each(hours)('Call at %i:%i on Monday', (minute, hour, expected) => {
    expect(initSchedule(minute, hour, 1)).toEqual(expected);
  });
});

describe('Timer runs only Mon-Fri', () => {
  const days = populateDaysArray(); // eslint-disable-line no-use-before-define


  test.each(days)('Call at 8:00 a.m. on %i-th day', (day, expected) => {
    expect(initSchedule(0, 8, day)).toEqual(expected);
  });
});

function populateHoursArray() {
  return [
    [0, 5, { toWork: false, fromWork: false }],
    [10, 5, { toWork: false, fromWork: false }],
    [20, 5, { toWork: false, fromWork: false }],
    [30, 5, { toWork: false, fromWork: false }],
    [0, 6, { toWork: true, fromWork: true }],
    [10, 6, { toWork: true, fromWork: false }],
    [20, 6, { toWork: true, fromWork: false }],
    [0, 7, { toWork: true, fromWork: true }],
    [10, 7, { toWork: true, fromWork: false }],
    [20, 7, { toWork: true, fromWork: false }],
    [30, 7, { toWork: true, fromWork: false }],
    [40, 7, { toWork: true, fromWork: false }],
    [0, 8, { toWork: true, fromWork: true }],
    [10, 8, { toWork: true, fromWork: false }],
    [20, 8, { toWork: true, fromWork: false }],
    [30, 8, { toWork: true, fromWork: false }],
    [0, 9, { toWork: true, fromWork: true }],
    [10, 9, { toWork: true, fromWork: false }],
    [20, 9, { toWork: true, fromWork: false }],
    [30, 9, { toWork: true, fromWork: false }],
    [0, 10, { toWork: true, fromWork: true }],
    [10, 10, { toWork: false, fromWork: false }],
    [20, 10, { toWork: false, fromWork: false }],
    [30, 10, { toWork: false, fromWork: false }],
    [0, 11, { toWork: true, fromWork: true }],
    [10, 11, { toWork: false, fromWork: false }],
    [20, 11, { toWork: false, fromWork: false }],
    [30, 11, { toWork: false, fromWork: false }],
    [0, 12, { toWork: true, fromWork: true }],
    [10, 12, { toWork: false, fromWork: false }],
    [20, 12, { toWork: false, fromWork: false }],
    [30, 12, { toWork: false, fromWork: false }],
    [0, 13, { toWork: true, fromWork: true }],
    [10, 13, { toWork: false, fromWork: false }],
    [20, 13, { toWork: false, fromWork: false }],
    [30, 13, { toWork: false, fromWork: false }],
    [0, 14, { toWork: true, fromWork: true }],
    [10, 14, { toWork: false, fromWork: false }],
    [20, 14, { toWork: false, fromWork: false }],
    [30, 14, { toWork: false, fromWork: false }],
    [0, 15, { toWork: true, fromWork: true }],
    [10, 15, { toWork: false, fromWork: true }],
    [20, 15, { toWork: false, fromWork: true }],
    [30, 15, { toWork: false, fromWork: true }],
    [0, 16, { toWork: true, fromWork: true }],
    [10, 16, { toWork: false, fromWork: true }],
    [20, 16, { toWork: false, fromWork: true }],
    [30, 16, { toWork: false, fromWork: true }],
    [0, 17, { toWork: true, fromWork: true }],
    [10, 17, { toWork: false, fromWork: true }],
    [20, 17, { toWork: false, fromWork: true }],
    [30, 17, { toWork: false, fromWork: true }],
    [0, 18, { toWork: true, fromWork: true }],
    [10, 18, { toWork: false, fromWork: true }],
    [20, 18, { toWork: false, fromWork: true }],
    [30, 18, { toWork: false, fromWork: true }],
    [0, 19, { toWork: true, fromWork: true }],
    [10, 19, { toWork: false, fromWork: true }],
    [20, 19, { toWork: false, fromWork: true }],
    [30, 19, { toWork: false, fromWork: true }],
    [40, 19, { toWork: false, fromWork: true }],
    [0, 20, { toWork: false, fromWork: false }],
    [10, 20, { toWork: false, fromWork: false }],
    [20, 20, { toWork: false, fromWork: false }],
    [30, 20, { toWork: false, fromWork: false }],
    [0, 21, { toWork: false, fromWork: false }],
    [10, 21, { toWork: false, fromWork: false }],
    [20, 21, { toWork: false, fromWork: false }],
    [30, 21, { toWork: false, fromWork: false }],
    [0, 22, { toWork: false, fromWork: false }],
    [10, 22, { toWork: false, fromWork: false }],
    [20, 22, { toWork: false, fromWork: false }],
    [30, 22, { toWork: false, fromWork: false }],
    [0, 23, { toWork: false, fromWork: false }],
    [10, 23, { toWork: false, fromWork: false }],
    [20, 23, { toWork: false, fromWork: false }],
    [30, 23, { toWork: false, fromWork: false }],
    [0, 0, { toWork: false, fromWork: false }],
    [10, 0, { toWork: false, fromWork: false }],
    [20, 0, { toWork: false, fromWork: false }],
    [30, 0, { toWork: false, fromWork: false }],
    [0, 1, { toWork: false, fromWork: false }],
    [10, 1, { toWork: false, fromWork: false }],
    [20, 1, { toWork: false, fromWork: false }],
    [30, 1, { toWork: false, fromWork: false }],
    [0, 2, { toWork: false, fromWork: false }],
    [10, 2, { toWork: false, fromWork: false }],
    [20, 2, { toWork: false, fromWork: false }],
    [30, 2, { toWork: false, fromWork: false }],
    [0, 3, { toWork: false, fromWork: false }],
    [10, 3, { toWork: false, fromWork: false }],
    [20, 3, { toWork: false, fromWork: false }],
    [30, 3, { toWork: false, fromWork: false }],
    [0, 4, { toWork: false, fromWork: false }],
    [10, 4, { toWork: false, fromWork: false }],
    [20, 4, { toWork: false, fromWork: false }],
    [30, 4, { toWork: false, fromWork: false }],
    [0, 5, { toWork: false, fromWork: false }],
    [10, 5, { toWork: false, fromWork: false }],
    [20, 5, { toWork: false, fromWork: false }],
    [30, 5, { toWork: false, fromWork: false }],
    [0, 6, { toWork: true, fromWork: true }],
    [10, 6, { toWork: true, fromWork: false }],
    [20, 6, { toWork: true, fromWork: false }],
    [30, 6, { toWork: true, fromWork: false }],
    [40, 6, { toWork: true, fromWork: false }],
    [50, 6, { toWork: true, fromWork: false }],
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
