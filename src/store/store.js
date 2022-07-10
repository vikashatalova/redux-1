import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { errorReducer } from "./errors";
import { logger } from "./middleware/logger";
import taskReducer from "./task";

// const middlewareEnhancer = applyMiddleware(logger, thunk)

const rootReducer = combineReducers({
    errors: errorReducer,
    tasks: taskReducer
})

function createStore() {
    return configureStore({ 
        reducer: rootReducer, 
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== "production"
    });
}

export default createStore

// compose(middlewareEnhancer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


