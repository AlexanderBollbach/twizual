import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import watchAllSagas from "./Sagas";

import createSagaMiddleware from "redux-saga";
const sagaMiddleware = createSagaMiddleware();
import twitterReducer from "Redux/Reducer";

import { createLogger } from "redux-logger";
const logger = createLogger({
  predicate: () => false
});

const rootReducer = combineReducers({
  twitter: twitterReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware, logger))
);

sagaMiddleware.run(watchAllSagas);

export default () => {
  return store;
};
