import { createStore, applyMiddleware } from 'redux';
import rootRoducer from './modules/rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './modules/rootSaga';
import { persistStore } from 'redux-persist';
import persistReducers from './modules/reduxPersist';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    persistReducers(rootRoducer),
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
