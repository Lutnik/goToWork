module.exports = function initSchedule(currentMinute, currentHour, currentDay) {
  if (currentDay > 0 && currentDay < 6) {
    if (currentHour >= 6 && currentHour < 10) { //  16 + 0
      return { toWork: true, fromWork: currentMinute < 10 };
    }
    if (currentHour >= 10 && currentHour < 15) { // 5 + 5
      return { toWork: currentMinute < 10, fromWork: currentMinute < 10 };
    }
    if (currentHour >= 15 && currentHour < 20) { // 5 + 20
      return { toWork: currentMinute < 10, fromWork: true };
    }
    return { toWork: false, fromWork: false };
  }
  return { toWork: false, fromWork: false };
  //    total API calls: 55/day; <1200/month;
}; //   0.01 USD each --> 12 USD/month
