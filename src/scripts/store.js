

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";   //中间件  写异步需要
import promise from "redux-promise";
import { reducers } from "./reducers";

const store = createStore(reducers, applyMiddleware(thunk, promise));

export default store;