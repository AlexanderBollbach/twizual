import { put, takeEvery, call, select } from "redux-saga/effects";
import "regenerator-runtime/runtime";
import * as Actions from "./Actions";
import { fetchTweets } from "./Api";

let maxTweetFetchCount = 30;

function* onAddScreenName(action) {
  let sn = action.screenName;

  if (sn == "") {
    yield put(Actions.showError("enter a user name!"));
    return;
  }

  // const state = yield select(); // possibly for caching
  // console.log(state);

  yield put(Actions.fetchMoreTweets(sn));
}

function* onFetchMoreTweets(action) {
  let screenName = action.screenName;

  const { twitter: state } = yield select();

  let snObject = state.screenNames[screenName];

  if (!snObject) {
    debugger;
  }

  if (snObject.fetchCount > maxTweetFetchCount) {
    console.log("too many requests");
    return;
  }

  // TODO refactor make base case clearer
  try {
    // getting new tweets further back in time starting at "action.startingFrom" (tweet id)
    const newTweets = yield call(fetchTweets, screenName, action.startingFrom);

    // load into state
    yield put(Actions.receiveTweets(screenName, newTweets));

    // get loaded tweets
    const { twitter: newState } = yield select();
    let tweetsForSN = newState.screenNames[screenName].tweets;

    // whats earliest tweet
    let earliestDateFound = earliestDate(tweetsForSN);
    let tweetAtDate = tweetsForSN.filter(m => {
      let currDate = new Date(m.created_at);
      return currDate.getTime() == earliestDateFound.getTime();
    })[0];

    // is it later than earliest required
    if (earliestDateFound.getTime() > state.dateRange.from.getTime()) {
      if (!screenName) {
        debugger;
      }
      console.log("needs more tweets");
      // prevent infinite fetching .....
      yield put(Actions.incrementFetchCountForUser(screenName));
      // recursive
      yield put(Actions.fetchMoreTweets(screenName, tweetAtDate.id));
    } else {
      console.log("apparently have enough tweets | too many fetches");
    }
  } catch (e) {
    yield put(Actions.showError(e.message));
  }
}

// helpers
let earliestDate = tweets => {
  let allDates = tweets.map(t => new Date(t.created_at));
  return new Date(Math.min.apply(null, allDates));
};

export default function* watchAllSagas() {
  yield takeEvery(Actions.ADD_SCREEN_NAME, onAddScreenName);
  yield takeEvery(Actions.FETCH_MORE_TWEETS_FOR_SCREEN_NAME, onFetchMoreTweets);
}
