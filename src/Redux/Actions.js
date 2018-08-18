export const RECEIVE_TWEETS_FOR_SCREEN_NAME = "RECEIVE_TWEETS_FOR_SCREEN_NAME";
export const ADD_SCREEN_NAME = "ADD_SCREEN_NAME";
export const INCREMENT_FETCH_COUNT = "INCREMENT_FETCH_COUNT";
export const FETCH_MORE_TWEETS_FOR_SCREEN_NAME =
  "FETCH_MORE_TWEETS_FOR_SCREEN_NAME";
export const SHOW_ERROR = "SHOW_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const TOGGLE_SCREEN_NAME_ENABLED = "TOGGLE_SCREEN_NAME_ENABLED";
export const SCREEN_NAME_SET_ACTIVE = "SCREEN_NAME_SET_ACTIVE";
export const SET_SELECTED_DATUM = "SET_SELECTED_DATUM";
export const SET_ACTIVE_DATUM = "SET_ACTIVE_DATUM";
export const REMOVE_SCREEN_NAME = "REMOVE_SCREEN_NAME";

export const setSelectedDatum = datum => ({
  type: SET_SELECTED_DATUM,
  datum
});

export const setActiveDatum = datum => ({
  type: SET_ACTIVE_DATUM,
  datum
});

export const receiveTweets = (screenName, tweets) => ({
  type: RECEIVE_TWEETS_FOR_SCREEN_NAME,
  screenName,
  tweets
});

export const toggleScreenNameEnabled = screenName => ({
  type: TOGGLE_SCREEN_NAME_ENABLED,
  screenName
});

export const screenNameSetActive = screenName => ({
  type: SCREEN_NAME_SET_ACTIVE,
  screenName
});

export const fetchMoreTweets = (screenName, startingFrom) => ({
  type: FETCH_MORE_TWEETS_FOR_SCREEN_NAME,
  screenName,
  startingFrom
});

export const addScreenName = screenName => ({
  type: ADD_SCREEN_NAME,
  screenName
});

export const removeScreenName = screenName => ({
  type: REMOVE_SCREEN_NAME,
  screenName
});

export const showError = errorString => ({
  type: SHOW_ERROR,
  errorString
});

export const clearError = () => ({
  type: CLEAR_ERROR
});

export const incrementFetchCountForUser = screenName => ({
  type: INCREMENT_FETCH_COUNT,
  screenName
});
