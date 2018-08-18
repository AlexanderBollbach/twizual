import * as Actions from "./Actions";
import { combineReducers } from "redux";

const activeScreenNames = (state = [], action) => {
  switch (action.type) {
    case Actions.SCREEN_NAME_SET_ACTIVE:
      return [action.screenName];
    default:
      return state;
  }
};

const enabledScreenNames = (state = [], action) => {
  switch (action.type) {
    case Actions.ADD_SCREEN_NAME:
      return [...state, action.screenName];
    case Actions.TOGGLE_SCREEN_NAME_ENABLED:
      if (state.indexOf(action.screenName) > -1) {
        return state.filter(e => e != action.screenName);
      } else {
        return [...state, action.screenName];
      }
    default:
      return state;
  }
};

const dateRange = (state = {}, action) => {
  let to = new Date();
  let from = new Date(new Date(to).setDate(to.getDate() - 30));
  return {
    from,
    to
  };
};

const activeDatum = (state = null, action) => {
  switch (action.type) {
    case Actions.SET_ACTIVE_DATUM:
      return action.datum;
    default:
      return state;
  }
};

const selectedDatum = (state = null, action) => {
  switch (action.type) {
    case Actions.SET_SELECTED_DATUM:
      return action.datum;
    default:
      return state;
  }
};

const screenNames = (state = {}, action) => {
  switch (action.type) {
    case Actions.RECEIVE_TWEETS_FOR_SCREEN_NAME:
      return {
        ...state,
        [action.screenName]: {
          ...state[action.screenName],
          tweets: [...state[action.screenName].tweets, ...action.tweets]
        }
      };
    case Actions.ADD_SCREEN_NAME:
      return {
        ...state,
        [action.screenName]: {
          tweets: [],
          fetchCount: 0,
          isActive: false
        }
      };

    case Actions.REMOVE_SCREEN_NAME:
      const { [action.screenName]: value, ...withoutScreenName } = state;
      return withoutScreenName;

    case Actions.INCREMENT_FETCH_COUNT:
      let sn = action.screenName;
      let SN = state[sn];
      if (!SN) {
        debugger;
      }
      let fetchCount = SN.fetchCount;

      return {
        ...state,
        [action.screenName]: {
          ...state[action.screenName],
          fetchCount: fetchCount + 1
        }
      };

    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case Actions.SHOW_ERROR:
      return action.errorString;
    case Actions.CLEAR_ERROR:
      return null;
    default:
      return null;
  }
};

const twitterReducer = combineReducers({
  dateRange,
  screenNames,
  error,
  activeDatum,
  selectedDatum,
  activeScreenNames,
  enabledScreenNames
});

export default twitterReducer;
