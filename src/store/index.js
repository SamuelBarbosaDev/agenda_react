import { createStore, applyMiddleware } from 'redux';
import rootRoducer from './modules/rootRoducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './modules/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootRoducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
