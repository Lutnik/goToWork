module.exports = function initSchedule(initHour) {
  let counter = 0;
  let hour = initHour;
  return (currentHour, currentDay) => {
    if (currentDay > 0 && currentDay < 6) {
      if (currentHour > hour) {
        hour = currentHour;
        counter = 0;
      } else if (currentHour === 0 && hour === 23) {
        hour = 0;
        counter = 0;
      }
      counter += 1;
      if (currentHour >= 6 && currentHour < 10) { //  16 + 4
        return { toWork: true, fromWork: counter === 1 };
      }
      if (currentHour >= 10 && currentHour < 15) { // 5 + 5
        return { toWork: counter === 1, fromWork: counter === 1 };
      }
      if (currentHour >= 15 && currentHour < 20) { // 5 + 20
        return { toWork: counter === 1, fromWork: true };
      }
      return { toWork: false, fromWork: false };
    }
    return { toWork: false, fromWork: false };
    //    total API calls: 55/day; <1200/month;
  }; //   0.01 USD each --> 12 USD/month
}
