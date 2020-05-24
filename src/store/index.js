import createSagaMiddleware from 'redux-saga';
import "regenerator-runtime"
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import rootReducer from '../reducers';
import saga from '../sagas'

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers(rootReducer), composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(saga);

export default store