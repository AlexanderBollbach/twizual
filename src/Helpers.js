export const formatTweetsToDay = (tweets, start, end) =>
  getDates(start, end).map(d => ({
    day: d,
    tweets: tweets.filter(t => isSameDay(new Date(t.created_at), d))
  }));

let isSameDay = (date1, date2) => {
  let isSame =
    date1.getDate() == date2.getDate() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getFullYear() == date2.getFullYear();
  return isSame;
};

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

let getDates = (startDate, stopDate) => {
  var dateArray = new Array();
  var currentDate = stopDate;
  while (currentDate >= startDate) {
    currentDate.setHours(0, 0, 0, 0);
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.addDays(-1);
  }
  return dateArray;
};

export const linesEqual = (l1, l2) => {
  if (l1.length != l2.length) {
    return false;
  }

  let zipped = l1.map((l, i) => [l1[i], l2[i]]);

  let linesInequalities = zipped.filter(l1l2 => {
    let d1 = l1l2[0];
    let d2 = l1l2[1];

    if (d1.id != d2.id) {
      return true;
    }

    if (d1.data.length != d2.data.length) {
      return true;
    }

    let dataZipped = d1.data.map((d, i) => [d1.data[i], d2.data[i]]);

    let dataInequalities = dataZipped.filter(d1d2 => {
      return !datumsEqual(d1d2[0], d1d2[1]);
    });

    return dataInequalities.length > 1;
  });

  return linesInequalities.length == 0;
};

export const datumsEqual = (d1, d2) => {
  if (!d1 || !d2) {
    return false;
  }

  if (d1.day.getTime() != d2.day.getTime()) {
    return false;
  }

  if (!(d1.tweets.length == d2.tweets.length)) {
    return false;
  }
  let zipped = d1.tweets.map((a, i) => [a, d2.tweets[i]]);

  return zipped.filter(z => z[0].id != z[1].id).length == 0;
};
