import "regenerator-runtime/runtime";
import { all } from "redux-saga/effects";

import allTwitterSagas from "Redux/TwitterSagas";

console.log("alltwitter");
console.log(allTwitterSagas);

export default function* rootSaga() {
  yield all([allTwitterSagas()]);
}
