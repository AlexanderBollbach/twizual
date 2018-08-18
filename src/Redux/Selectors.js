import { createSelector } from "reselect";
import { formatTweetsToDay } from "src/Helpers";

const getScreenNames = state =>
  Object.keys(state.screenNames).map(k => {
    let sn = state.screenNames[k];
    return { tweets: sn.tweets, id: k };
  });

const dateRangeSelector = state => state.dateRange;

export const getTweetDateMaps = createSelector(
  [getScreenNames, dateRangeSelector],
  (screenNames, dateRange) =>
    screenNames.map(sn => ({
      data: formatTweetsToDay(sn.tweets, dateRange.from, dateRange.to),
      id: sn.id
    }))
);
