// import { createStore, applyMiddleware, compose } from "redux"
// import thunk from "redux-thunk"
// import { createWrapper } from "next-redux-wrapper"
// import rootReducer from "./reducer/rootReducer"

// const middleware = [thunk]

// const makeStore = () => createStore(rootReducer, compose(applyMiddleware(...middleware)))
// //const store = createStore(rootReducer, compose(applyMiddleware(...middleware)))

// export const wrapper = createWrapper(makeStore)

import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { createWrapper } from "next-redux-wrapper"
import rootReducer from "./reducer/rootReducer"

const middleware = [thunk]

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const makeStore = () => createStore(rootReducer, enhancer)

export const wrapper = createWrapper(makeStore)